import { TestBed } from '@angular/core/testing';

import { WstempService } from './wstemp.service';

describe('WstempService', () => {
  let service: WstempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WstempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
