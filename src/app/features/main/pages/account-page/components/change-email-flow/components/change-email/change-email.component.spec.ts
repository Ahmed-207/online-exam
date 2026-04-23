import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEmailComponent } from './change-email.component';

describe('ChangeEmailComponent', () => {
  let component: ChangeEmailComponent;
  let fixture: ComponentFixture<ChangeEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeEmailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
