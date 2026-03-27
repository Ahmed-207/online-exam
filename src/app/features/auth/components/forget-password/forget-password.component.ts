import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MainButtonComponent } from "../../../../shared/components/main-button/main-button.component";
import { InputTextModule } from 'primeng/inputtext';
import { PrimeIcons } from 'primeng/api';
import { AuthService } from 'auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertMessageComponent } from "../../../../shared/components/alert-message/alert-message.component";

@Component({
  selector: 'app-forget-password',
  imports: [MainButtonComponent, InputTextModule, ReactiveFormsModule, AlertMessageComponent],
  providers: [PrimeIcons],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {

  private readonly _authService = inject(AuthService);
  private readonly _fb = inject(FormBuilder);
  private readonly _router = inject(Router);
  emailConfirmForPass: WritableSignal<FormGroup> = signal({} as FormGroup);
  emailSubscription: WritableSignal<Subscription> = signal(new Subscription);
  buttonFlag: WritableSignal<boolean> = signal(false);
  errorFlag: WritableSignal<boolean> = signal(false);
  errorMsg: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.createEmailForm();

  }

  createEmailForm(): void {
    this.emailConfirmForPass.set(this._fb.group({
      email: [null, [Validators.required, Validators.email]]
    }));
  }

  submitEmail(): void {
    if (this.emailConfirmForPass().valid) {
      this.buttonFlag.set(true);
      this.errorFlag.set(false);
      this.emailSubscription().unsubscribe;
      this.emailSubscription.set(this._authService.forgetPass(this.emailConfirmForPass().value).subscribe({
        next: (res) => {
          console.log(res);
          this.buttonFlag.set(false);
          this.errorFlag.set(false);
          this._router.navigate(['/verify-repass'], {
            state: { email: this.emailConfirmForPass().get('email')?.value }
          });

        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error.message);
          this.errorMsg.set(err.error.message)
          this.errorFlag.set(true);
          this.buttonFlag.set(false);
        }
      }));
    }
  }

  navigateToRegister(): void {
    this._router.navigate(['/email-confirm']);
  }

}
