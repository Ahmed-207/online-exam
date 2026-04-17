import { Component } from '@angular/core';
import { QuesHeaderComponent } from "./components/ques-header/ques-header.component";
import { ExamResultsComponent } from "./components/exam-results/exam-results.component";

@Component({
  selector: 'app-exam-ques',
  imports: [QuesHeaderComponent, ExamResultsComponent],
  templateUrl: './exam-ques.component.html',
  styleUrl: './exam-ques.component.css',
})
export class ExamQuesComponent {

  

}
