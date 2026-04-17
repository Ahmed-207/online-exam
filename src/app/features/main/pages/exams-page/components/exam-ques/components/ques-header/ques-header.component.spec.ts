import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuesHeaderComponent } from './ques-header.component';

describe('QuesHeaderComponent', () => {
  let component: QuesHeaderComponent;
  let fixture: ComponentFixture<QuesHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuesHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuesHeaderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
