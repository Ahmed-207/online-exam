import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyRepassComponent } from './verify-repass.component';

describe('VerifyRepassComponent', () => {
  let component: VerifyRepassComponent;
  let fixture: ComponentFixture<VerifyRepassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyRepassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyRepassComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
