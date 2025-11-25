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
    // On remonte la logique dans le service qui gère la donnée utilisée pour valider le champ
    //   => on peut se le permettre car le service est très simple
    //
    // Cela permet d'avoir une seule méthode réutilisable ici, pour le template driven
    //   et dans le composant ajout-tache-reactive-forms pour le reactive form
    return this.gestionTaches.libelleExisteValidator(control);
  }

}
