import { TestBed } from '@angular/core/testing';

import { BaseCmsService } from './base-cms.service';

describe('BaseCmsService', () => {
  let service: BaseCmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseCmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
