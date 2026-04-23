import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEmailFlowComponent } from './change-email-flow.component';

describe('ChangeEmailFlowComponent', () => {
  let component: ChangeEmailFlowComponent;
  let fixture: ComponentFixture<ChangeEmailFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeEmailFlowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeEmailFlowComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
