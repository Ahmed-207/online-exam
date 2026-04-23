import { Component, inject, input, InputSignal, OnDestroy, OnInit, output, signal, WritableSignal } from '@angular/core';
import { InputOtpModule } from 'primeng/inputotp';
import { MainButtonComponent } from "../../../../../../shared/components/main-button/main-button.component";
import { PrimeIcons } from 'primeng/api';
import { AuthService } from 'auth';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertMessageComponent } from "../../../../../../shared/components/alert-message/alert-message.component";

@Component({
  selector: 'app-verify-otp',
  providers: [PrimeIcons],
  imports: [InputOtpModule, MainButtonComponent, AlertMessageComponent, ReactiveFormsModule],
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.css',
})
export class VerifyOtpComponent implements OnInit, OnDestroy {

  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly _fb = inject(FormBuilder);
  counterFlag: WritableSignal<boolean> = signal<boolean>(true);
  counter: WritableSignal<number> = signal<number>(60);
  intervalRef: any;
  storedEmail: InputSignal<string> = input<string>('');
  verifyForm!: FormGroup;
  buttonFlag: WritableSignal<boolean> = signal(false);
  errorFlag: WritableSignal<boolean> = signal(false);
  errorMsg: WritableSignal<string> = signal('');
  subscriptionRef: WritableSignal<Subscription> = signal(new Subscription);
  currentStateFlag = output<string>();

  otpEmit(): void {
    this.currentStateFlag.emit('register');
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
        this.errorFlag.set(true);
        this.errorMsg.set(err.message);
      }
    })
  }

  resetEmail(): void {
    this.currentStateFlag.emit('email confirm');
  }

  createVerifyForm(): void {

    this.verifyForm = this._fb.group({
      code: [null, [Validators.required]]
    })

  }

  sendCodeToVerify(): void {
    if (this.verifyForm.valid) {
      this.buttonFlag.set(true);
      this.errorFlag.set(false);
      this.subscriptionRef().unsubscribe;
      this.subscriptionRef.set(this._authService.verify({ code: this.verifyForm.get('code')?.value, email: this.storedEmail() }).subscribe({
        next: (res: any) => {
          this.buttonFlag.set(false);
          console.log(res);
          this.otpEmit();
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


  ngOnDestroy(): void {
    clearInterval(this.intervalRef);
  }

}
