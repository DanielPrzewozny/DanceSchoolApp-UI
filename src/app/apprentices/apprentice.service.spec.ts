import { TestBed } from '@angular/core/testing';

import { ApprenticeService } from './apprentice.service';

describe('ApprenticeService', () => {
  let service: ApprenticeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprenticeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
