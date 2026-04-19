import { Component, computed, effect, inject, input, InputSignal, OnDestroy, signal, WritableSignal, OnInit, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MainButtonComponent } from "../../../../../../../../shared/components/main-button/main-button.component";
import { Question } from '../../../../interfaces/exam-ques-res.interface';
import { DiplomaExamsService } from '../../../../services/diploma-exams.service';
import { AnswerForSubmit } from '../../../../interfaces/answer-submit-req.interface';


@Component({
  selector: 'app-question',
  imports: [RadioButtonModule, ReactiveFormsModule, MainButtonComponent],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css',
})
export class QuestionComponent implements OnInit, OnDestroy {

  private readonly examService = inject(DiplomaExamsService);
  examQuestionsData = computed<Question[]>(() => { return this.examService.examQuestions() });
  currentIndex = signal(0);
  currentQuestion = computed<Question | undefined>(() => {
    const questions = this.examQuestionsData();
    return questions.length > 0 ? questions[this.currentIndex()] : undefined;
  });
  currentQuesId = computed(() => {
    const quesId = this.currentQuestion()?.id;
    if (quesId) {
      return quesId;
    } else {
      return '';
    }
  });
  currentSelectedAnswer: WritableSignal<AnswerForSubmit> = signal<AnswerForSubmit>({} as AnswerForSubmit);
  allSelectedAnswers: WritableSignal<AnswerForSubmit[]> = signal<AnswerForSubmit[]>([]);
  questionForm: FormControl = new FormControl('');
  currentExamId = computed<string>(() => this.examService.currentExamId());
  answerReqBody = computed(() => {
    return {
      examId: this.currentExamId(),
      answers: this.allSelectedAnswers()
    }
  });
  timerId!: any;
  buttonFlag: WritableSignal<boolean> = signal<boolean>(true);
  restartFlagForExam: InputSignal<boolean> = input<boolean>(false);
  internalRestartFlag: WritableSignal<boolean> = signal<boolean>(false);
  restartFlagForParentEmit = output<boolean>();

  constructor() {
    effect(() => {
      this.internalRestartFlag.set(this.restartFlagForExam());
      const id = this.currentQuesId();
      const saved = this.allSelectedAnswers().find(a => a.questionId === id);

      this.timerId = setTimeout(() => {
        if (saved) {
          this.questionForm.setValue(saved.answerId, { emitEvent: false });
        } else {
          this.questionForm.setValue(null, { emitEvent: false });
        }
      });
    });
  }

  ngOnInit(): void {

    this.initiateExam();

  }

  initiateExam(): void {

    this.internalRestartFlag.set(this.restartFlagForExam());
    if (this.internalRestartFlag()) {
      this.currentIndex.set(0);
      this.allSelectedAnswers.set([]);
      this.internalRestartFlag.set(false);
      this.restartFlagForParentEmit.emit(false);

    }
  }


  submitAnswer(): void {
    const answerValue = this.questionForm.value;
    if (!answerValue) return;

    const newAnswer: AnswerForSubmit = {
      questionId: this.currentQuesId(),
      answerId: answerValue
    };

    const alreadyAnswered = this.allSelectedAnswers().some(
      answer => answer.questionId === this.currentQuesId()
    );

    if (alreadyAnswered) {
      this.allSelectedAnswers.update(answers =>
        answers.map(a => a.questionId === this.currentQuesId() ? newAnswer : a)
      );
    } else {
      this.allSelectedAnswers.update(answers => [...answers, newAnswer]);
    }

    console.log(this.allSelectedAnswers());

    if (this.currentIndex() < this.examQuestionsData().length - 1) {
      this.currentIndex.update(i => i + 1);
      this.questionForm.reset();
    } else {
      this.submitAnswersForReq();
    }
  }

  submitAnswersForReq(): void {
    this.buttonFlag.set(false);
    this.examService.submitAllExamAnswers(this.answerReqBody()).subscribe({
      next: (res) => {
        console.log(res);
        this.examService.examFinishFlag.set(true);
        this.examService.submissionId.set(res.payload.submission.id);
        this.buttonFlag.set(true);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  getPreviousQuestion(): void {
    if (this.currentIndex() > 0) {
      this.currentIndex.update(i => i - 1);
    }
  }

  ngOnDestroy(): void {

    clearTimeout(this.timerId);

  }

}
