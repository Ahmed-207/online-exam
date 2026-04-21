import { ChangeDetectorRef, Component, computed, effect, inject, input, InputSignal, PLATFORM_ID, signal, WritableSignal, OnDestroy, output } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { ChartModule } from 'primeng/chart';
import { isPlatformBrowser } from '@angular/common';
import { DiplomaExamsService } from '../../../../services/diploma-exams.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-ques-header',
  imports: [ProgressBarModule, ChartModule],
  templateUrl: './ques-header.component.html',
  styleUrl: './ques-header.component.css',
})
export class QuesHeaderComponent {
  data: any;
  options: any;
  platformId = inject(PLATFORM_ID);
  cd = inject(ChangeDetectorRef);
  private readonly examService = inject(DiplomaExamsService);
  currentQuestionIndex: InputSignal<number> = input.required<number>();
  totalQuestions = computed<number>(() => { return this.examService.examQuestions().length });
  progressValue = computed(() => this.currentQuestionIndex() / this.totalQuestions() * 100);
  diplomaTitle = computed<string>(() => this.examService.currentDiplomaTitle());
  examTitle = computed<string>(() => this.examService.currentExamTitle());
  examFinishFlag: InputSignal<boolean> = input.required<boolean>();
  totalTime = computed<number>(() => this.examService.currentExamTime());
  totalTimeInSeconds = computed(() => this.totalTime() * 60);
  passedTime: WritableSignal<number> = signal(0);
  intervalId!: any;
  remainingTimeDisplay = computed(() => {
    const total = this.totalTimeInSeconds();
    const passed = this.passedTime();
    const remaining = Math.max(0, total - passed);

    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  });
  timeLimitReached = output<boolean>();
  private readonly breakpointObserver = inject(BreakpointObserver);

  isSmallScreen = toSignal(
    this.breakpointObserver.observe('(max-width: 800px)').pipe(
      map(result => result.matches)
    ),
    { initialValue: false }
  );


  constructor() {
    effect(() => {
      console.log('Header detected index change:', this.currentQuestionIndex());
      console.log('Calculated Progress:', this.progressValue());
      const passed = this.passedTime();
      const total = this.totalTimeInSeconds();
      if (isPlatformBrowser(this.platformId)) {
        const documentStyle = getComputedStyle(document.documentElement);
        this.data = {
          datasets: [{
            data: [total - passed, passed],
            backgroundColor: [
              documentStyle.getPropertyValue('--p-blue-600'),
              documentStyle.getPropertyValue('--p-blue-100')
            ],
            borderWidth: 0
          }]
        };
      }

      console.log(`Timer: ${passed}/${total}`);

    });
  }


  ngOnInit() {
    this.initChart();
    this.startTimer();
  }


  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      this.data = {
        labels: ['A', 'B'],
        datasets: [
          {
            data: [this.passedTime(), this.totalTime()],
            backgroundColor: [documentStyle.getPropertyValue('--p-blue-600'), documentStyle.getPropertyValue('--p-blue-100'), documentStyle.getPropertyValue('--p-gray-500')],
          }
        ]
      };

      this.options = {
        cutout: '80%',
        animation: { duration: 1000, easing: 'linear' }, // Smooth movement
        plugins: { legend: { display: false }, tooltip: { enabled: false } }
      };
    }
    this.cd.markForCheck();
  }

  startTimer() {
    if (isPlatformBrowser(this.platformId)) {
      this.intervalId = setInterval(() => {
        if (this.passedTime() < this.totalTimeInSeconds()) {
          this.passedTime.update(v => v + 1);
        } else {
          this.stopTimer();
          // trigger your exam submission here
          this.timeLimitReached.emit(true);
        }
      }, 1000);
    }
  }
  stopTimer() {
    if (this.intervalId) clearInterval(this.intervalId);
  }


  ngOnDestroy(): void {
    this.stopTimer();
    this.timeLimitReached.emit(false);
  }

}
