import { Directive, forwardRef, inject } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { GestionTaches } from './gestion-taches';

@Directive({
  selector: '[appLibelleUniqueValidator]',providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() =>LibelleUniqueValidator),
      multi: true // Très important de garder le `multi:true`
    }
  ]
})
export class LibelleUniqueValidator implements Validator {

  private gestionTaches = inject(GestionTaches);

  validate(control: AbstractControl): ValidationErrors | null {
    const libelle = control.value ?? '';

    if (!libelle.trim()) {
      return null; // Ne pas valider si vide car rôle du validator `required`
    }

    return this.gestionTaches.libelleExiste(libelle) ? { libelleExiste: true } : null;
  }

}
