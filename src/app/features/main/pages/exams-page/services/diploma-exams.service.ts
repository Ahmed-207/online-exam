import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KEYS } from '../../../../../core/utilities/keys';
import { DiplomaExamsRes } from '../interfaces/diploma-exams-res.interface';

@Injectable({
  providedIn: 'root',
})
export class DiplomaExamsService {

  private readonly httpClient = inject(HttpClient);

  getAllDiplomaExams(id:string):Observable<DiplomaExamsRes>{
    return this.httpClient.get<DiplomaExamsRes>(`https://exam-app.elevate-bootcamp.cloud/api/exams?diplomaId=${id}&page=1&limit=20`, {
      headers:{
        'Authorization': KEYS.tokenForRequests
      }
    })
  }
  
}
