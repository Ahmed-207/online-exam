import { EmailRes, EmailResAdapted } from "./email.interface";
import { RegisterRes, RegisterResAdapted } from "./register.interface";
import { SignInRes, SignInResAdapted } from "./sign-in.interface";

export interface Adapt {


    adaptEmail(data: EmailRes): EmailResAdapted;
    adaptRegister(data: RegisterRes): RegisterResAdapted;
    adaptSignIn(data: SignInRes): SignInResAdapted;




}


