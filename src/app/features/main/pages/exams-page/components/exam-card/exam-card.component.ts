import { Component, computed, inject, input, InputSignal, OnInit, signal, WritableSignal } from '@angular/core';
import { LucideAngularModule, CircleQuestionMark, Timer} from 'lucide-angular';
import { MainButtonComponent } from "../../../../../../shared/components/main-button/main-button.component";
import { Exam } from '../../interfaces/diploma-exams-res.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { PageTitleService } from '../../../../../../core/services/page-title.service';
import { DiplomaExamsService } from '../../services/diploma-exams.service';

@Component({
  selector: 'app-exam-card',
  imports: [LucideAngularModule, MainButtonComponent],
  templateUrl: './exam-card.component.html',
  styleUrl: './exam-card.component.css',
})
export class ExamCardComponent implements OnInit{

  readonly circleQuestionMark = CircleQuestionMark;
  readonly timer = Timer;
  examData: InputSignal<Exam> = input.required<Exam>();
  private readonly router = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly pageTitle = inject(PageTitleService);
  private readonly examService = inject(DiplomaExamsService);
  examId = computed<string>(()=> { return this.examData().id});


  ngOnInit(): void {

    this.pageTitle.previousPageTitle.set(this.pageTitle.generalPageTitle());

  }


  navigateToExamQuestions():void{

    this.router.navigate([this.examId()], {relativeTo: this.activeRoute});
    this.examService.currentExamTitle.set(this.examData().title);
    this.examService.currentExamTime.set(this.examData().duration);
    this.pageTitle.generalPageTitle.set(this.examData().title);


  }


}
