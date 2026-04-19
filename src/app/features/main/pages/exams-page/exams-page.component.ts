import { DiplomaExamsService } from './services/diploma-exams.service';
import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { ExamCardComponent } from "./components/exam-card/exam-card.component";
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Exam } from './interfaces/diploma-exams-res.interface';

@Component({
  selector: 'app-exams-page',
  imports: [ExamCardComponent],
  templateUrl: './exams-page.component.html',
  styleUrl: './exams-page.component.css',
})
export class ExamsPageComponent implements OnInit {

  private readonly examsService = inject(DiplomaExamsService);
  private readonly plat_id = inject(PLATFORM_ID);
  private readonly activeRoute = inject(ActivatedRoute);
  diplomaIdForExams: WritableSignal<string> = signal<string>('');
  diplomaExams: WritableSignal<Exam[]> = signal<Exam[]>([]);

  ngOnInit(): void {

    if (isPlatformBrowser(this.plat_id)) {
      this.activeRoute.paramMap.subscribe({
        next: (params) => {
          this.diplomaIdForExams.set(params.get('id')!)
        }
      })
      this.getExams(this.diplomaIdForExams());
    }

  }

  getExams(id: string): void {
    if (localStorage.getItem('token')) {
      this.examsService.getAllDiplomaExams(id).subscribe({
        next: (res) => {
          this.diplomaExams.set(res.payload.data);
          this.examsService.currentDiplomaTitle.set(res.payload.data[0].diploma.title);
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

}
