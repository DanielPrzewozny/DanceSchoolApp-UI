import { TestBed } from '@angular/core/testing';

import { ClubCardService } from './club-card.service';

describe('ClubCardService', () => {
  let service: ClubCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClubCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
