import { AuthService } from 'auth';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { MainButtonComponent } from "../../../../shared/components/main-button/main-button.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-email-confirm',
  imports: [InputTextModule, MainButtonComponent, ReactiveFormsModule],
  templateUrl: './email-confirm.component.html',
  styleUrl: './email-confirm.component.css',
})
export class EmailConfirmComponent implements OnInit {

  private readonly _authService = inject(AuthService);
  private readonly _fb = inject(FormBuilder);
  emailConfirm: WritableSignal<FormGroup> = signal({} as FormGroup);
  emailSubscription: WritableSignal<Subscription> = signal(new Subscription);
  buttonFlag: WritableSignal<boolean> = signal(false);
  errorFlag:WritableSignal<boolean> = signal(false);
  errorMsg: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.createEmailForm();

  }

  createEmailForm(): void {
    this.emailConfirm.set(this._fb.group({
      email: [null, [Validators.required, Validators.email]]
    }));
  }

  submitEmail(): void {
    if (this.emailConfirm().valid) {
      this.buttonFlag.set(true);
      this.errorFlag.set(false);
      this.emailSubscription().unsubscribe;
      this.emailSubscription.set(this._authService.sendEmailVer(this.emailConfirm().value).subscribe({
        next: (res) => {
          console.log(res);
          this.buttonFlag.set(false);
        },
        error: (err:HttpErrorResponse) => {
          console.log(err.error.message);
          this.errorMsg.set(err.error.message)
          this.errorFlag.set(true);
          this.buttonFlag.set(false);
        }
      }));
    }
  }

}
