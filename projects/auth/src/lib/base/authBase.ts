import { Observable } from "rxjs";
import { RegisterReq, RegisterRes } from "../interfaces/register.interface";
import { SignInReq, SignInRes } from "../interfaces/sign-in.interface";
import { ForgetPassReq, ForgetPassRes } from "../interfaces/forget-pass.interface";
import { VerifyReq, VerifyRes } from "../interfaces/verify.interface";
import { ResetPassReq, ResetPassRes } from "../interfaces/reset-pass.interface";
import { EmailReq, EmailRes } from "../interfaces/email.interface";

export abstract class Authentication {

    abstract sendEmailVer(data:EmailReq):Observable<EmailRes | string>;
    abstract verify(data: VerifyReq): Observable<VerifyRes | string>;
    abstract register(data: RegisterReq): Observable<RegisterRes | string>;
    abstract signIn(data: SignInReq): Observable<SignInRes | string>;
    abstract forgetPass(data: ForgetPassReq): Observable<ForgetPassRes | string>;
    abstract resetPass(data: ResetPassReq): Observable<ResetPassRes | string>;


}