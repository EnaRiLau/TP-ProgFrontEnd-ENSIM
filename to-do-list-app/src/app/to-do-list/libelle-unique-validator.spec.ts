import { LibelleUniqueValidator } from './libelle-unique-validator';

describe('LibelleUniqueValidator', () => {
  it('should create an instance', () => {
    const directive = new LibelleUniqueValidator();
    expect(directive).toBeTruthy();
  });
});
