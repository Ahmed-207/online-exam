import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { MainButtonComponent } from "../../../../shared/components/main-button/main-button.component";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { AlertMessageComponent } from "../../../../shared/components/alert-message/alert-message.component";
import { environment } from '../../../../../environments/environment';
import { passwordMatchValidator } from '../../../../core/utilities/pass-match.validator';

@Component({
  selector: 'app-repass',
  imports: [PasswordModule, MainButtonComponent, AlertMessageComponent, ReactiveFormsModule],
  templateUrl: './repass.component.html',
  styleUrl: './repass.component.css',
})
export class RepassComponent implements OnInit {

  private readonly _router = inject(Router);
  private readonly _activeRoute = inject(ActivatedRoute);
  private readonly _authService = inject(AuthService);
  private readonly _fb = inject(FormBuilder);
  private readonly plat_id = inject(PLATFORM_ID);
  confirmNewPassForm!: FormGroup;
  storedToken: WritableSignal<string> = signal<string>('');
  buttonFlag: WritableSignal<boolean> = signal(false);
  errorFlag: WritableSignal<boolean> = signal(false);
  errorMsg: WritableSignal<string> = signal('');
  subscriptionRef: WritableSignal<Subscription> = signal(new Subscription);


  ngOnInit(): void {

    if (isPlatformBrowser(this.plat_id)) {
      const token = this._activeRoute.snapshot.queryParamMap.get('token');
      if (token) {
        this.storedToken.set(token);
      }
    }

    this.createPassForm();

  }

  createPassForm(): void {
    this.confirmNewPassForm = this._fb.group({
      newPassword: [null, [Validators.required, Validators.pattern(environment.passPattern)]],
      confirmPassword: [null, [Validators.required, Validators.pattern(environment.passPattern)]]
    }, { validators: passwordMatchValidator })
  }


  changePass(): void {
    if (this.confirmNewPassForm.valid) {

      this.buttonFlag.set(true);
      this.errorFlag.set(false);
      this.subscriptionRef().unsubscribe;
      this.subscriptionRef.set(this._authService.resetPass({ token: this.storedToken(), ...this.confirmNewPassForm.value }).subscribe({
        next: (res) => {
          this.buttonFlag.set(false);
          this.errorFlag.set(false);
          console.log(res);
          this._router.navigate(['/login'])

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



}
