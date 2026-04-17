import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomasPageComponent } from './diplomas-page.component';

describe('DiplomasPageComponent', () => {
  let component: DiplomasPageComponent;
  let fixture: ComponentFixture<DiplomasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiplomasPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiplomasPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
