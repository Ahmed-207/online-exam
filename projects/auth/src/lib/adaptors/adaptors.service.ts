import { EmailRes, EmailResAdapted } from './../interfaces/email.interface';
import { Injectable } from '@angular/core';
import { Adapt } from '../interfaces/adapt.interface';
import { RegisterRes, RegisterResAdapted } from '../interfaces/register.interface';
import { SignInRes, SignInResAdapted } from '../interfaces/sign-in.interface';

@Injectable({
  providedIn: 'root',
})
export class AdaptorsService implements Adapt {

  adaptEmail(data: EmailRes): EmailResAdapted {
    return { ...data as EmailRes } as EmailResAdapted
  }
  adaptRegister(data: RegisterRes): RegisterResAdapted {
    return {
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      email: data.user.email,
      phone: data.user.phone,
      token: data.token
    } as RegisterResAdapted
  };
  adaptSignIn(data: SignInRes): SignInResAdapted {
    return {
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      email: data.user.email,
      profilePhoto: data.user.profilePhoto,
      token: data.token
    } as SignInResAdapted
  };


}
