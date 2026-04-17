import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsPageComponent } from './exams-page.component';

describe('ExamsPageComponent', () => {
  let component: ExamsPageComponent;
  let fixture: ComponentFixture<ExamsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamsPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
