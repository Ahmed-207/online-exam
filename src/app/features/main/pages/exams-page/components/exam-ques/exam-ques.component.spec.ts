import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamQuesComponent } from './exam-ques.component';

describe('ExamQuesComponent', () => {
  let component: ExamQuesComponent;
  let fixture: ComponentFixture<ExamQuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamQuesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamQuesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
