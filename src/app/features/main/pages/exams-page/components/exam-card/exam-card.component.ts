import { Component, computed, inject, input, InputSignal } from '@angular/core';
import { LucideAngularModule, CircleQuestionMark, Timer } from 'lucide-angular';
import { MainButtonComponent } from "../../../../../../shared/components/main-button/main-button.component";
import { Exam } from '../../interfaces/diploma-exams-res.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { PageTitleService } from '../../../../../../core/services/page-title.service';
import { DiplomaExamsService } from '../../services/diploma-exams.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-exam-card',
  imports: [LucideAngularModule, MainButtonComponent],
  templateUrl: './exam-card.component.html',
  styleUrl: './exam-card.component.css',
})
export class ExamCardComponent {

  readonly circleQuestionMark = CircleQuestionMark;
  readonly timer = Timer;
  examData: InputSignal<Exam> = input.required<Exam>();
  private readonly router = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly pageTitle = inject(PageTitleService);
  private readonly examService = inject(DiplomaExamsService);
  examId = computed<string>(() => { return this.examData().id });
  private readonly breakpointObserver = inject(BreakpointObserver);


  isSmallScreen = toSignal(
    this.breakpointObserver.observe('(max-width: 800px)').pipe(
      map(result => result.matches)
    ),
    { initialValue: false }
  );



  navigateToExamQuestions(): void {

    this.router.navigate([this.examId()], { relativeTo: this.activeRoute });
    this.examService.currentExamTitle.set(this.examData().title);
    this.examService.currentDiplomaTitle.set(this.examData().diploma.title);
    this.examService.currentExamTime.set(this.examData().duration);
    this.pageTitle.updateTitle(this.examData().title);


  }


}
