import { Component, inject, signal, WritableSignal } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { MainButtonComponent } from "../../../../shared/components/main-button/main-button.component";
import { Router } from '@angular/router';
import { AuthService } from 'auth';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertMessageComponent } from "../../../../shared/components/alert-message/alert-message.component";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-pass',
  imports: [PasswordModule, MainButtonComponent, ReactiveFormsModule, AlertMessageComponent],
  templateUrl: './create-pass.component.html',
  styleUrl: './create-pass.component.css',
})
export class CreatePassComponent {

  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);
  private readonly _fb = inject(FormBuilder);
  storedRegisterData: WritableSignal<object> = signal<object>({});
  confirmPassForm: WritableSignal<FormGroup> = signal<FormGroup>({} as FormGroup);
  buttonFlag: WritableSignal<boolean> = signal(false);
  errorFlag: WritableSignal<boolean> = signal(false);
  errorMsg: WritableSignal<string> = signal('');
  subscriptionRef: WritableSignal<Subscription> = signal(new Subscription);

  constructor() {
    const nav = this._router.currentNavigation();
    const storedRegData = nav?.extras.state;
    this.storedRegisterData.set(storedRegData!);
  }

  ngOnInit(): void {

    this.createPassForm();

  }

  createPassForm(): void {
    this.confirmPassForm.set(this._fb.group({
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPassword: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
    }, { validators: this.validateConfirmPassword }))
  }

  validateConfirmPassword(g: AbstractControl) {

    let gPassword = g.get('password')?.value;
    let gRePassword = g.get('confirmPassword')?.value;

    return gPassword === gRePassword ? null : { mismatch: true }

  }

  createAccount(): void {
    if (this.confirmPassForm().valid) {

      this.buttonFlag.set(true);
      this.errorFlag.set(false);
      this.subscriptionRef().unsubscribe;
      this.subscriptionRef.set(this._authService.register({ ...this.storedRegisterData(), ...this.confirmPassForm().value }).subscribe({
        next: (res) => {
          this.buttonFlag.set(false);
          console.log(res);
          localStorage.setItem('token', res.payload.token);
          this._router.navigate(['/main'])

        },
        error: (err:HttpErrorResponse) => {
          this.buttonFlag.set(false);
          this.errorMsg.set(err.error.message)
          this.errorFlag.set(true);
          console.log(err);
        }
      }))
    }
  }

}
