import { TestBed } from '@angular/core/testing';

import { GestionTaches } from './gestion-taches';

describe('GestionTaches', () => {
  let service: GestionTaches;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionTaches);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
