import { Component } from '@angular/core';
import { QuesHeaderComponent } from "./components/ques-header/ques-header.component";
import { QuestionComponent } from "./components/question/question.component";

@Component({
  selector: 'app-exam-ques',
  imports: [QuesHeaderComponent, QuestionComponent],
  templateUrl: './exam-ques.component.html',
  styleUrl: './exam-ques.component.css',
})
export class ExamQuesComponent {

}
