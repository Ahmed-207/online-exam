import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyChangeEmailComponent } from './verify-change-email.component';

describe('VerifyChangeEmailComponent', () => {
  let component: VerifyChangeEmailComponent;
  let fixture: ComponentFixture<VerifyChangeEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyChangeEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyChangeEmailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
