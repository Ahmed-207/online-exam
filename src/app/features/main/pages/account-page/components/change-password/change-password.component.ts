import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Password, PasswordModule } from 'primeng/password';
import { environment } from '../../../../../../../environments/environment';
import { passwordMatchValidator } from '../../../../../../core/utilities/pass-match.validator';
import { MainButtonComponent } from "../../../../../../shared/components/main-button/main-button.component";
import { AlertMessageComponent } from "../../../../../../shared/components/alert-message/alert-message.component";
import { MessageService } from 'primeng/api';
import { UserProfileService } from '../../services/user-profile.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  imports: [Password, PasswordModule, ReactiveFormsModule, MainButtonComponent, AlertMessageComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent implements OnInit {

  passwordChangeForm!: FormGroup;
  private readonly fb = inject(FormBuilder);
  buttonFlag: WritableSignal<boolean> = signal<boolean>(false);
  errorMsg: WritableSignal<string> = signal<string>('');
  errorFlag: WritableSignal<boolean> = signal<boolean>(false);
  private readonly messageService = inject(MessageService);
  private readonly userProfileService = inject(UserProfileService);

  ngOnInit(): void {

    this.initiatePasswordForm();


  }

  initiatePasswordForm(): void {
    this.passwordChangeForm = this.fb.group({
      currentPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required, Validators.pattern(environment.passPattern)]],
      confirmPassword: [null, [Validators.required, Validators.pattern(environment.passPattern)]]
    }, { validators: passwordMatchValidator })
  }

  submitPassChange(): void {
    if (this.passwordChangeForm.valid) {
      this.buttonFlag.set(true);
      this.userProfileService.requestPassChange(this.passwordChangeForm.value).subscribe({
        next: (res) => {
          this.messageService.add({
            detail: res.message,
            key: 'br',
            life: 3000,
            icon: 'pi pi-check-circle'
          });
          this.buttonFlag.set(false);
          this.errorFlag.set(false);
        },
        error: (err: HttpErrorResponse) => {
          this.buttonFlag.set(false);
          this.errorFlag.set(true);
          this.errorMsg.set(err.error.message);
        }
      })
    }
  }

}


