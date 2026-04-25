import { Component, inject, input, InputSignal, OnDestroy, OnInit, output, signal, WritableSignal } from '@angular/core';
import { PasswordModule, Password } from 'primeng/password';
import { MainButtonComponent } from "../../../../../../shared/components/main-button/main-button.component";
import { Router } from '@angular/router';
import { AuthService } from 'auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertMessageComponent } from "../../../../../../shared/components/alert-message/alert-message.component";
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../../../../environments/environment';
import { passwordMatchValidator } from '../../../../../../core/utilities/pass-match.validator';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-pass',
  imports: [Password, PasswordModule, MainButtonComponent, ReactiveFormsModule, AlertMessageComponent],
  templateUrl: './create-pass.component.html',
  styleUrl: './create-pass.component.css',
})
export class CreatePassComponent implements OnInit, OnDestroy {

  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);
  private readonly _fb = inject(FormBuilder);
  private readonly messageService = inject(MessageService);
  storedRegisterData: InputSignal<{}> = input<{}>({});
  confirmPassForm!: FormGroup;
  buttonFlag: WritableSignal<boolean> = signal(false);
  errorFlag: WritableSignal<boolean> = signal(false);
  errorMsg: WritableSignal<string> = signal('');
  subscriptionRef: WritableSignal<Subscription> = signal(new Subscription);
  timeOutRef:any;

  ngOnInit(): void {

    this.createPassForm();

  }

  createPassForm(): void {
    this.confirmPassForm = this._fb.group({
      password: [null, [Validators.required, Validators.pattern(environment.passPattern)]],
      confirmPassword: [null, [Validators.required, Validators.pattern(environment.passPattern)]]
    }, { validators: passwordMatchValidator })
  }


  createAccount(): void {
    if (this.confirmPassForm.valid) {

      this.buttonFlag.set(true);
      this.errorFlag.set(false);
      this.subscriptionRef().unsubscribe;
      this.subscriptionRef.set(this._authService.register({ ...this.storedRegisterData(), ...this.confirmPassForm.value }).subscribe({
        next: (res) => {
          this.buttonFlag.set(false);
          console.log(res);
          this.errorFlag.set(false);
          localStorage.setItem('token', res.payload.token);
          this.messageService.add({
            detail: `account created successfully, Welcome${res.payload.user.firstName}`,
            key: 'br',
            life: 1500,
            icon: 'pi pi-check-circle'
          });
          this.timeOutRef = setTimeout(()=>{
            this._router.navigate(['/home']);
          }, 1000)

        },
        error: (err: HttpErrorResponse) => {
          this.buttonFlag.set(false);
          this.errorMsg.set(err.error.message)
          this.errorFlag.set(true);
          console.log(err);
        }
      }))
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeOutRef);
  }
}
