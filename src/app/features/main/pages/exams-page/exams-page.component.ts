import { Component } from '@angular/core';
import { ExamCardComponent } from "./components/exam-card/exam-card.component";

@Component({
  selector: 'app-exams-page',
  imports: [ExamCardComponent],
  templateUrl: './exams-page.component.html',
  styleUrl: './exams-page.component.css',
})
export class ExamsPageComponent {

}
