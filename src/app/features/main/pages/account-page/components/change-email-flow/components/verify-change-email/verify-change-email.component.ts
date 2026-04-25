import { Component, inject, input, InputSignal, OnDestroy, OnInit, output, signal, WritableSignal } from '@angular/core';
import { InputOtpModule } from 'primeng/inputotp';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MainButtonComponent } from '../../../../../../../../shared/components/main-button/main-button.component';
import { AlertMessageComponent } from '../../../../../../../../shared/components/alert-message/alert-message.component';
import { UserProfileService } from '../../../../services/user-profile.service';
import { ModalFlagService } from '../../../../services/modal-flag.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-verify-change-email',
  imports: [InputOtpModule, MainButtonComponent, AlertMessageComponent, ReactiveFormsModule],
  templateUrl: './verify-change-email.component.html',
  styleUrl: './verify-change-email.component.css',
})
export class VerifyChangeEmailComponent implements OnInit, OnDestroy {

  counterFlag: WritableSignal<boolean> = signal<boolean>(true);
  counter: WritableSignal<number> = signal<number>(60);
  intervalRef: any;
  verifyForm!: FormGroup;
  storedEmail: InputSignal<string> = input<string>('');
  buttonFlag: WritableSignal<boolean> = signal(false);
  errorFlag: WritableSignal<boolean> = signal(false);
  errorMsg: WritableSignal<string> = signal('');
  stateForParent = output<string>();
  private readonly fb = inject(FormBuilder);
  private readonly userProfileService = inject(UserProfileService);
  private readonly modalFlag = inject(ModalFlagService);
  private readonly messageService = inject(MessageService);

  ngOnInit(): void {

    this.counterSet();
    this.initiateVerifyForm();

  }

  initiateVerifyForm(): void {
    this.verifyForm = this.fb.group({
      code: [null, [Validators.required]]
    })
  }

  resetEmail(): void {
    this.stateForParent.emit('change email');
  }

  resendCode(): void {
    this.userProfileService.updateUserEmail({ newEmail: this.storedEmail() }).subscribe({
      next: (res) => {
        this.counter.set(60);
        this.counterFlag.set(true);
        this.counterSet();
        console.log(res);
      },
      error: (err: HttpErrorResponse) => {
        this.errorFlag.set(true);
        this.errorMsg.set(err.message);
      }

    })
  }

  submitCode(): void {
    this.buttonFlag.set(true);
    if (this.verifyForm.valid) {
      this.userProfileService.postVerifyCode(this.verifyForm.value).subscribe({
        next: (res) => {
          this.userProfileService.userProfileData.set(res.payload.user);
          this.buttonFlag.set(false);
          this.errorFlag.set(false);
          console.log(res);
          this.messageService.add({
            detail: `email changed successfully`,
            key: 'br',
            life: 2000,
            icon: 'pi pi-check-circle'
          });
          this.modalFlag.emailModalFlag.set(false);
        },
        error: (err: HttpErrorResponse) => {
          this.errorFlag.set(true);
          this.buttonFlag.set(false);
          this.errorMsg.set(err.message);
        }
      })
    }
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

  ngOnDestroy(): void {
    clearInterval(this.intervalRef);
  }

}
