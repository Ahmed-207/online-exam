import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepassComponent } from './repass.component';

describe('RepassComponent', () => {
  let component: RepassComponent;
  let fixture: ComponentFixture<RepassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepassComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
