import { TestBed } from '@angular/core/testing';

import { SoccerTrackerService } from './soccer-tracker.service';

fdescribe('SoccerTrackerService', () => {
  let service: SoccerTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoccerTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
