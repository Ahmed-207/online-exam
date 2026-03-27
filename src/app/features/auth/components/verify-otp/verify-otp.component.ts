import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { InputOtpModule } from 'primeng/inputotp';
import { MainButtonComponent } from "../../../../shared/components/main-button/main-button.component";
import { PrimeIcons } from 'primeng/api';
import { AuthService } from 'auth';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertMessageComponent } from "../../../../shared/components/alert-message/alert-message.component";

@Component({
  selector: 'app-verify-otp',
  providers: [PrimeIcons],
  imports: [InputOtpModule, MainButtonComponent, AlertMessageComponent, ReactiveFormsModule],
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.css',
})
export class VerifyOtpComponent implements OnInit {

  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly _fb = inject(FormBuilder);
  counterFlag: WritableSignal<boolean> = signal<boolean>(true);
  counter: WritableSignal<number> = signal<number>(60);
  intervalRef: any;
  storedEmail: WritableSignal<string> = signal<string>('');
  verifyForm: WritableSignal<FormGroup> = signal<FormGroup>({} as FormGroup);
  buttonFlag: WritableSignal<boolean> = signal(false);
  errorFlag: WritableSignal<boolean> = signal(false);
  errorMsg: WritableSignal<string> = signal('');
  subscriptionRef: WritableSignal<Subscription> = signal(new Subscription);

  constructor() {
    const nav = this._router.currentNavigation();
    const email = nav?.extras.state?.['email'];
    this.storedEmail.set(email);
  }

  ngOnInit(): void {
    this.createVerifyForm();
    this.counterSet();
  }

  counterSet(): void {
    if (this.intervalRef) {
      clearInterval(this.intervalRef);
    }
    this.intervalRef = setInterval(() => {
      if (this.counter() === 0) {
        this.counterFlag.set(false);
      } else {
        this.counterFlag.set(true);
        this.counter.update((v) => v - 1);
      }
    }, 1000);
  }

  resendCode(): void {
    this._authService.sendEmailVer({ 'email': this.storedEmail() }).subscribe({
      next: (res) => {
        console.log(res);
        this.counter.set(60);
        this.counterFlag.set(true);
        this.counterSet();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  resetEmail(): void {
    this._router.navigate(['/email-confirm']);
  }

  createVerifyForm(): void {

    this.verifyForm.set(this._fb.group({
      code: [null, [Validators.required]]
    }))

  }

  sendCodeToVerify(): void {
    if (this.verifyForm().valid) {
      this.buttonFlag.set(true);
      this.errorFlag.set(false);
      this.subscriptionRef().unsubscribe;
      this.subscriptionRef.set(this._authService.verify({ code: this.verifyForm().get('code')?.value, email: this.storedEmail() }).subscribe({
        next: (res:any) => {
          this.buttonFlag.set(false);
          console.log(res);
          this._router.navigate(['/auth/register'], {
            state: { email: this.storedEmail()}
          });
        },
        error: (err: HttpErrorResponse) => {
          this.buttonFlag.set(false);
          this.errorMsg.set(err.error.message)
          this.errorFlag.set(true);
          console.log(err);
        }
      }));
    }
  }



}
