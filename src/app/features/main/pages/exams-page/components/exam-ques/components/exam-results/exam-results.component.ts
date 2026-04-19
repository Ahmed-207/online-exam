import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, output, PLATFORM_ID, signal, WritableSignal, OnDestroy } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MainButtonComponent } from "../../../../../../../../shared/components/main-button/main-button.component";
import { DiplomaExamsService } from '../../../../services/diploma-exams.service';
import { Analytic, ExamResultRes } from '../../../../interfaces/exam-result-res.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-exam-results',
  imports: [ChartModule, RadioButtonModule, FormsModule, MainButtonComponent],
  templateUrl: './exam-results.component.html',
  styleUrl: './exam-results.component.css',
})
export class ExamResultsComponent implements OnInit, OnDestroy {

  data: any;
  options: any;
  platformId = inject(PLATFORM_ID);
  cd = inject(ChangeDetectorRef);
  private readonly examService = inject(DiplomaExamsService);
  private readonly plat_id = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  examResults: WritableSignal<Analytic[]> = signal<Analytic[]>([]);
  examResultsFullData: WritableSignal<ExamResultRes> = signal<ExamResultRes>({} as ExamResultRes);
  restartFlag = output<boolean>();
  currentIndexForParent = output<number>();


  ngOnInit() {
    if (isPlatformBrowser(this.plat_id)) {
      this.getExamResults();
    }
  }

  initChart() {

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');

    this.data = {
      labels: [`Correct : ${this.examResultsFullData().payload.submission.correctAnswers}`, `Incorrect : ${this.examResultsFullData().payload.submission.wrongAnswers}`],
      datasets: [
        {
          data: [this.examResultsFullData().payload.submission.correctAnswers, this.examResultsFullData().payload.submission.totalQuestions],
          backgroundColor: [documentStyle.getPropertyValue('--p-emerald-500'), documentStyle.getPropertyValue('--p-red-500'), documentStyle.getPropertyValue('--p-gray-500')],
        }
      ]
    };

    this.options = {
      cutout: '60%',
      plugins: {
        legend: {
          position: 'bottom',
          align: 'start',
          labels: {
            color: textColor,
            boxWidth: 15,
            padding: 15,
            align: 'vertical',
            font: {
              size: 14,
              weight: '500',
              family: 'monospace'
            }
          }
        }
      }
    }
    this.cd.markForCheck();
  }


  getExamResults(): void {
    this.examService.getAllExamResults(this.examService.submissionId()).subscribe({
      next: (res) => {
        console.log(res);
        this.examResultsFullData.set(res);
        this.examResults.set(res.payload.analytics);
        this.initChart();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  exploreDiplomas(): void {

    this.router.navigate(['/home/diplomas']);

  }

  restartExam(): void {
    this.examService.examFinishFlag.set(false);
    this.examService.submissionId.set('');
    this.currentIndexForParent.emit(1)
    this.restartFlag.emit(true);
  }

  ngOnDestroy() {
    this.examService.examFinishFlag.set(false);
  }


}
