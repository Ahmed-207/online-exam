import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaCardComponent } from './diploma-card.component';

describe('DiplomaCardComponent', () => {
  let component: DiplomaCardComponent;
  let fixture: ComponentFixture<DiplomaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiplomaCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiplomaCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
