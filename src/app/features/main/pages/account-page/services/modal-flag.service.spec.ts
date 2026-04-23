import { TestBed } from '@angular/core/testing';

import { ModalFlagService } from './modal-flag.service';

describe('ModalFlagService', () => {
  let service: ModalFlagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalFlagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
