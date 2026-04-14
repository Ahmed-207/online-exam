import { AuthService } from 'auth';
import { Component, inject, OnInit, output, signal, WritableSignal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { MainButtonComponent } from "../../../../../../shared/components/main-button/main-button.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertMessageComponent } from "../../../../../../shared/components/alert-message/alert-message.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-confirm',
  imports: [InputTextModule, MainButtonComponent, ReactiveFormsModule, AlertMessageComponent],
  templateUrl: './email-confirm.component.html',
  styleUrl: './email-confirm.component.css',
})
export class EmailConfirmComponent implements OnInit {

  private readonly _authService = inject(AuthService);
  private readonly _fb = inject(FormBuilder);
  private readonly _router = inject(Router);
  emailConfirm!: FormGroup;
  emailSubscription: WritableSignal<Subscription> = signal(new Subscription);
  buttonFlag: WritableSignal<boolean> = signal(false);
  errorFlag: WritableSignal<boolean> = signal(false);
  errorMsg: WritableSignal<string> = signal('');
  currentStateFlag = output<string>();
  emailForParent = output<string>();

  ngOnInit(): void {
    this.createEmailForm();

  }

  createEmailForm(): void {
    this.emailConfirm = this._fb.group({
      email: [null, [Validators.required, Validators.email]]
    });
  }

  emailEmit():void{
    this.currentStateFlag.emit('verify otp');
  }

  emailValueEmit():void{
    this.emailForParent.emit(this.emailConfirm.get('email')?.value);
  }

  submitEmail(): void {
    if (this.emailConfirm.valid) {
      this.buttonFlag.set(true);
      this.errorFlag.set(false);
      this.emailSubscription().unsubscribe;
      this.emailSubscription.set(this._authService.sendEmailVer(this.emailConfirm.value).subscribe({
        next: (res:any) => {
          console.log(res);
          this.buttonFlag.set(false);
          this.errorFlag.set(false);
          this.emailEmit();
          this.emailValueEmit();
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

}
