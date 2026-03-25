import { inject, Injectable } from '@angular/core';
import { Authentication } from './base/authBase';
import { HttpClient } from '@angular/common/http';
import { RegisterReq, RegisterRes } from './interfaces/register.interface';
import { catchError, map, Observable, of } from 'rxjs';
import { SignInReq, SignInRes } from './interfaces/sign-in.interface';
import { ForgetPassReq, ForgetPassRes } from './interfaces/forget-pass.interface';
import { VerifyReq, VerifyRes } from './interfaces/verify.interface';
import { ResetPassReq, ResetPassRes } from './interfaces/reset-pass.interface';
import { AuthEndPoints } from './enums/AuthEndPoints';
import { AdaptorsService } from './adaptors/adaptors.service';
import { EmailReq, EmailRes } from './interfaces/email.interface';


@Injectable({
  providedIn: 'root',
})
export class AuthService implements Authentication {

  private readonly _httpClient = inject(HttpClient);
  private readonly _adaptor = inject(AdaptorsService);

  sendEmailVer(data: EmailReq): Observable<EmailRes | string> {
    return this._httpClient.post<EmailRes>(AuthEndPoints.EMAILVER, data).pipe(map((res) => this._adaptor.adaptEmail(res)), catchError(err => of(err)));
  }

  verify(data: VerifyReq): Observable<VerifyRes | string> {
    return this._httpClient.post<VerifyRes>(AuthEndPoints.VERIFY, data).pipe(catchError(err => of(err)));
  };

  register(data: RegisterReq): Observable<RegisterRes| string> {
    return this._httpClient.post<RegisterRes>(AuthEndPoints.REGISTER, data).pipe(map(res =>  this._adaptor.adaptRegister(res)), catchError(err => of(err)));
  };

  signIn(data: SignInReq): Observable<SignInRes | string> {
    return this._httpClient.post<SignInRes>(AuthEndPoints.SIGNIN, data).pipe(map(res => this._adaptor.adaptSignIn(res)), catchError(err => of(err)));
  };

  forgetPass(data: ForgetPassReq): Observable<ForgetPassRes | string> {
    return this._httpClient.post<ForgetPassRes | string>(AuthEndPoints.FORGETPASSWORD, data).pipe(catchError(err => of(err)));
  };

  resetPass(data: ResetPassReq): Observable<ResetPassRes | string> {
    return this._httpClient.post<ResetPassRes | string>(AuthEndPoints.RESETPASSWORD, data).pipe(catchError(err => of(err)));
  };


}
