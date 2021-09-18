import { TestBed } from '@angular/core/testing';

import { MymailService } from './mymail.service';

describe('MymailService', () => {
  let service: MymailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MymailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
