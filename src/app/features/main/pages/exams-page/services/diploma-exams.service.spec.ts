import { TestBed } from '@angular/core/testing';

import { DiplomaExamsService } from './diploma-exams.service';

describe('DiplomaExamsService', () => {
  let service: DiplomaExamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiplomaExamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
