import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get loading', () => {
    service.loading = true;
    expect(service).toBeTruthy();
  });

  it('should stop loading', () => {
    service.loading = true;
    service.stopLoading();
    expect(service.loading).toBeFalsy();
  });
});
