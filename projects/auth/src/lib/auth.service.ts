import { inject, Injectable } from '@angular/core';
import { Authentication } from './base/authBase';
import { HttpClient } from '@angular/common/http';
import { RegisterReq, RegisterRes } from './interfaces/register.interface';
import { Observable } from 'rxjs';
import { SignInReq, SignInRes } from './interfaces/sign-in.interface';
import { ForgetPassReq, ForgetPassRes } from './interfaces/forget-pass.interface';
import { VerifyReq, VerifyRes } from './interfaces/verify.interface';
import { ResetPassReq, ResetPassRes } from './interfaces/reset-pass.interface';
import { AuthEndPoints } from './enums/AuthEndPoints';

import { EmailReq, EmailRes } from './interfaces/email.interface';


@Injectable({
  providedIn: 'root',
})
export class AuthService implements Authentication {

  private readonly _httpClient = inject(HttpClient);


  sendEmailVer(data: EmailReq): Observable<EmailRes> {
    return this._httpClient.post<EmailRes>(AuthEndPoints.EMAILVER, data)
 
  }

  verify(data: VerifyReq): Observable<VerifyRes> {
    return this._httpClient.post<VerifyRes>(AuthEndPoints.VERIFY, data)
  };

  register(data: RegisterReq): Observable<RegisterRes> {
    return this._httpClient.post<RegisterRes>(AuthEndPoints.REGISTER, data)

  };

  signIn(data: SignInReq): Observable<SignInRes> {
    return this._httpClient.post<SignInRes>(AuthEndPoints.SIGNIN, data)
  };

  forgetPass(data: ForgetPassReq): Observable<ForgetPassRes> {
    return this._httpClient.post<ForgetPassRes>(AuthEndPoints.FORGETPASSWORD, data)
  };

  resetPass(data: ResetPassReq): Observable<ResetPassRes> {
    return this._httpClient.post<ResetPassRes>(AuthEndPoints.RESETPASSWORD, data)
  };


}
