import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KEYS } from '../../../../../core/utilities/keys';
import { DiplomasRes } from '../interfaces/diplomas-res.interface';

@Injectable({
  providedIn: 'root',
})
export class DiplomasService {

  private readonly httpClient = inject(HttpClient);

  getAllDiplomas(): Observable<DiplomasRes> {
    return this.httpClient.get<DiplomasRes>('https://exam-app.elevate-bootcamp.cloud/api/diplomas?page=1&limit=20', {
      headers: {
        'Authorization': KEYS.tokenForRequests
      }
    })
  }

}
