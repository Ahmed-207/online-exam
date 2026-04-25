import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { KEYS } from '../../../../../core/utilities/keys';
import { DiplomaExamsRes } from '../interfaces/diploma-exams-res.interface';
import { ExamQuesRes, Question } from '../interfaces/exam-ques-res.interface';
import { AnswerSubmitReq } from '../interfaces/answer-submit-req.interface';
import { AnswerSubmitRes } from '../interfaces/answer-submit-res.interface';
import { ExamResultRes } from '../interfaces/exam-result-res.interface';

@Injectable({
  providedIn: 'root',
})
export class DiplomaExamsService {

  private readonly httpClient = inject(HttpClient);
  examQuestions: WritableSignal<Question[]> = signal<Question[]>([]);
  examFinishFlag: WritableSignal<boolean> = signal<boolean>(false);
  submissionId: WritableSignal<string> = signal<string>('');
  currentExamId: WritableSignal<string> = signal<string>('');
  currentExamTitle: WritableSignal<string> = signal<string>('');
  currentDiplomaTitle: WritableSignal<string> = signal<string>('');
  currentExamTime:WritableSignal<number> = signal<number>(0);

  getAllDiplomaExams(id: string, pageIndex: number): Observable<DiplomaExamsRes> {
    return this.httpClient.get<DiplomaExamsRes>(`https://exam-app.elevate-bootcamp.cloud/api/exams?diplomaId=${id}&page=${pageIndex}&limit=5`, {
      headers: {
        'Authorization': KEYS.tokenForRequests
      }
    })
  }

  getAllExamQuestions(id: string): Observable<ExamQuesRes> {
    return this.httpClient.get<ExamQuesRes>(`https://exam-app.elevate-bootcamp.cloud/api/questions/exam/${id}`, {
      headers: {
        'Authorization': KEYS.tokenForRequests
      }
    });
  }

  submitAllExamAnswers(answers: AnswerSubmitReq): Observable<AnswerSubmitRes> {
    return this.httpClient.post<AnswerSubmitRes>('https://exam-app.elevate-bootcamp.cloud/api/submissions', answers, {
      headers: {
        'Authorization': KEYS.tokenForRequests
      }
    });
  }

  getAllExamResults(subId: string): Observable<ExamResultRes> {

    return this.httpClient.get<ExamResultRes>(`https://exam-app.elevate-bootcamp.cloud/api/submissions/${subId}`, {
      headers: {
        'Authorization': KEYS.tokenForRequests
      }
    })
  }

}
