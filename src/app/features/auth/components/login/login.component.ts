import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { MainButtonComponent } from "../../../../shared/components/main-button/main-button.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'auth';
import { Subscription } from 'rxjs';
import { AlertMessageComponent } from "../../../../shared/components/alert-message/alert-message.component";
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [InputTextModule, PasswordModule, MainButtonComponent, AlertMessageComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {

  private readonly _fb = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  loginForm: WritableSignal<FormGroup> = signal<FormGroup>({} as FormGroup);
  buttonFlag: WritableSignal<boolean> = signal(false);
  errorFlag: WritableSignal<boolean> = signal(false);
  errorMsg: WritableSignal<string> = signal('');
  subscriptionRef: WritableSignal<Subscription> = signal(new Subscription);


  ngOnInit(): void {

    this.createLoginForm();

  }

  createLoginForm(): void {

    this.loginForm.set(this._fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    }))

  }

  login():void{
    if(this.loginForm().valid){
      this.buttonFlag.set(true);
      this.subscriptionRef().unsubscribe();
      this.subscriptionRef.set(this._authService.signIn(this.loginForm().value).subscribe({
        next: (res)=>{
          this.buttonFlag.set(false);
          this.errorFlag.set(false);
          console.log(res);
          localStorage.setItem('token', res.payload.token);
          this._router.navigate(['/main']);

        },
        error: (err:HttpErrorResponse)=>{
          this.buttonFlag.set(false);
          this.errorFlag.set(true);
          this.errorMsg.set(err.error.message);
          console.log(err.error.message);


        }
      }))
    }
  }

  navigateToRegister():void{
    this._router.navigate(['/email-confirm']);
  }

  navigateToForgetPass():void{
    this._router.navigate(['/forget-password']);
  }




}
