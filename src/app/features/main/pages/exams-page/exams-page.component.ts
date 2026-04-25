import { DiplomaExamsService } from './services/diploma-exams.service';
import { Component, effect, ElementRef, inject, OnDestroy, OnInit, PLATFORM_ID, signal, viewChild, WritableSignal } from '@angular/core';
import { ExamCardComponent } from "./components/exam-card/exam-card.component";
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Exam } from './interfaces/diploma-exams-res.interface';
import { MainButtonComponent } from "../../../../shared/components/main-button/main-button.component";

@Component({
  selector: 'app-exams-page',
  imports: [ExamCardComponent, MainButtonComponent],
  templateUrl: './exams-page.component.html',
  styleUrl: './exams-page.component.css',
})
export class ExamsPageComponent implements OnInit, OnDestroy {

  private readonly examsService = inject(DiplomaExamsService);
  private readonly plat_id = inject(PLATFORM_ID);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  diplomaIdForExams: WritableSignal<string> = signal<string>('');
  diplomaExams: WritableSignal<Exam[]> = signal<Exam[]>([]);
  sentinel = viewChild<ElementRef>('nextPageSentinel');
  hasMoreData = signal(true);
  isLoading: WritableSignal<boolean> = signal<boolean>(false);
  currentPage: number = 1;
  timeOutRef: any;

  ngOnInit(): void {

    if (isPlatformBrowser(this.plat_id)) {
      this.activeRoute.paramMap.subscribe({
        next: (params) => {
          this.diplomaIdForExams.set(params.get('id')!)
        }
      })
      this.getExams();
    }

  }

  constructor() {
    effect(() => {
      const element = this.sentinel()?.nativeElement;
      if (element && isPlatformBrowser(this.plat_id)) {
        this.timeOutRef = setTimeout(() => {
          this.setupIntersectionObserver(element);
        }, 1000);
      }
    });
  }

  setupIntersectionObserver(element: HTMLElement) {

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.isLoading() && this.hasMoreData()) {
          this.getExams();
        }
      });
    });

    observer.observe(element);
  }

  getExams(): void {
    this.isLoading.set(true);
    this.examsService.getAllDiplomaExams(this.diplomaIdForExams(), this.currentPage).subscribe({
      next: (res) => {
        const newData = res.payload.data;

        if (newData.length === 0) {
          this.hasMoreData.set(false);
        } else {
          this.diplomaExams.update(prev => [...prev, ...newData]);
          this.currentPage++;
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      }
    });
  }

  getBackToDiplomas(): void {
    this.router.navigate(['/home/diplomas']);
  }

  ngOnDestroy(): void {
    
    clearTimeout(this.timeOutRef);
    
  }
}
