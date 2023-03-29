import { TestBed } from '@angular/core/testing';

import { JmeterService } from './jmeter.service';

describe('JmeterService', () => {
  let service: JmeterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JmeterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
