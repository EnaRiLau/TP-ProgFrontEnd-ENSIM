import { Component, inject, output } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Task } from '../task';
import { GestionTaches } from '../gestion-taches';

@Component({
  selector: 'app-ajout-tache-reactive-forms',
  imports: [ReactiveFormsModule],
  templateUrl: './ajout-tache-reactive-forms.html',
  styleUrl: './ajout-tache-reactive-forms.css',
})
export class AjoutTacheReactiveForms {

  // Service de gestion de tâches pour tester les libellés
  private gestionTaches = inject(GestionTaches);

  // Service utilitaire pour créer la config du formulaire
  private fb = inject(FormBuilder);

  // Output pour envoyer la tâche
  nouvelleTache = output<Task>();

  // Déclaration du formulaire
  form = this.fb.group({
    libelle :this.fb.control('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      this.gestionTaches.libelleExisteValidator // On ajoute directement le validator géré par le service
    ]),
    done: this.fb.control(false)
  });

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    // Récupération de la valeur du formulaire
    const value = this.form.value;

    // Emission d'une tâche utilisant les données du formulaire et des valeurs par défaut
    //   l'identifiant est arbitraire car écrasé dans la méthode d'enregistrement
    this.nouvelleTache.emit({
      id: 0,
      description: '',
      libelle: value.libelle ?? '',
      done: value.done ?? true
    });
  }

}
