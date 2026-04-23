import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { KEYS } from '../../../../../core/utilities/keys';
import { DeleteAccountRes, EmailChangeRes, User, UserProfileRes } from '../interfaces/user-profile-res.interface';
import { EditEmailReq, EditProfileReq, VerifyEmailCodeReq } from '../interfaces/edit-profile-req.interface';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {

  private readonly httpClient = inject(HttpClient);
  userProfileData: WritableSignal<User> = signal({} as User);


  getUserProfileData(): Observable<UserProfileRes> {
    return this.httpClient.get<UserProfileRes>('https://exam-app.elevate-bootcamp.cloud/api/users/profile', {
      headers: {
        'Authorization': KEYS.tokenForRequests
      }
    })
  }

  updateUserProfileData(userData: EditProfileReq):Observable<UserProfileRes>{
    return this.httpClient.patch<UserProfileRes>('https://exam-app.elevate-bootcamp.cloud/api/users/profile', userData, {
      headers: {
        'Authorization': KEYS.tokenForRequests
      }
    })
  }

  updateUserEmail(userNewEmail: EditEmailReq):Observable<EmailChangeRes>{
    return this.httpClient.post<EmailChangeRes>('https://exam-app.elevate-bootcamp.cloud/api/users/email/request', userNewEmail, {
      headers: {
        'Authorization': KEYS.tokenForRequests
      }
    });
  }

  postVerifyCode(verifyCode: VerifyEmailCodeReq):Observable<UserProfileRes>{
    return this.httpClient.post<UserProfileRes>('https://exam-app.elevate-bootcamp.cloud/api/users/email/confirm', verifyCode, {
      headers: {
        'Authorization': KEYS.tokenForRequests
      }
    })
  }

  deleteAccount():Observable<DeleteAccountRes>{
    return this.httpClient.delete<DeleteAccountRes>('https://exam-app.elevate-bootcamp.cloud/api/users/account', {
      headers: {
        'Authorization': KEYS.tokenForRequests
      }
    })
  }

}
