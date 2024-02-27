import { TestBed } from '@angular/core/testing';

import { BackendCallerService } from './backend-caller.service';

describe('BackendCallerService', () => {
  let service: BackendCallerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendCallerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
