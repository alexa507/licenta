import { TestBed } from '@angular/core/testing';

import { StocareTokenService } from './stocare-token.service';

describe('StocareTokenService', () => {
  let service: StocareTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StocareTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
