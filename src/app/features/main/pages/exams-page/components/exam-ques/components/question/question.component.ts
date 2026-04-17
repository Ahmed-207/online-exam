import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MainButtonComponent } from "../../../../../../../../shared/components/main-button/main-button.component";

@Component({
  selector: 'app-question',
  imports: [RadioButtonModule, FormsModule, MainButtonComponent],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css',
})
export class QuestionComponent {

  selectedCategory: any = null;
  answers: any[] = ['a', 'b', 'c'];

  ngOnInit() {
    this.selectedCategory = this.answers[1];
  }

}
