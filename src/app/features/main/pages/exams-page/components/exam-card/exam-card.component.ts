import { Component, input, InputSignal } from '@angular/core';
import { LucideAngularModule, CircleQuestionMark, Timer} from 'lucide-angular';
import { MainButtonComponent } from "../../../../../../shared/components/main-button/main-button.component";
import { Exam } from '../../interfaces/diploma-exams-res.interface';

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


}
