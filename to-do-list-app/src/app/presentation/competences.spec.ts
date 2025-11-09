import { TestBed } from '@angular/core/testing';

import { Competences } from './competences';

describe('Competences', () => {
  let service: Competences;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Competences);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
