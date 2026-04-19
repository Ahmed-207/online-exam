import { Component, computed, inject, OnDestroy, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { QuesHeaderComponent } from "./components/ques-header/ques-header.component";
import { DiplomaExamsService } from '../../services/diploma-exams.service';
import { isPlatformBrowser } from '@angular/common';
import { QuestionComponent } from "./components/question/question.component";
import { ActivatedRoute } from '@angular/router';
import { ExamResultsComponent } from "./components/exam-results/exam-results.component";

@Component({
  selector: 'app-exam-ques',
  imports: [QuesHeaderComponent, QuestionComponent, ExamResultsComponent],
  templateUrl: './exam-ques.component.html',
  styleUrl: './exam-ques.component.css',
})
export class ExamQuesComponent implements OnInit, OnDestroy {


  private readonly examService = inject(DiplomaExamsService);
  private readonly plat_id = inject(PLATFORM_ID);
  private readonly activeRoute = inject(ActivatedRoute);
  isExamFinished = computed<boolean>(() => this.examService.examFinishFlag());
  parentRestartFlag: WritableSignal<boolean> = signal<boolean>(false);



  ngOnInit(): void {

    this.examService.examFinishFlag.set(false);
    if (isPlatformBrowser(this.plat_id)) {
      this.activeRoute.paramMap.subscribe({
        next: (params) => {
          const examId = params.get('examId');
          if (examId) {
            this.getExamQuestions(examId);
            this.examService.currentExamId.set(examId);
          }
        }
      })
    }

  }


  getExamQuestions(id: string): void {
    if (localStorage.getItem('token')) {

      this.examService.getAllExamQuestions(id).subscribe({
        next: (res) => {
          this.examService.examQuestions.set(res.payload.questions);
          console.log(this.examService.examQuestions());
        },
        error: (err) => {
          console.log(err);
        }
      });

    }
  }

  ngOnDestroy(): void {
    this.examService.examFinishFlag.set(false);
    this.examService.submissionId.set('');
    this.examService.examQuestions.set([]);
  }

}
