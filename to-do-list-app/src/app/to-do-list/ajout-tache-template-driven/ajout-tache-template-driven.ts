import { Component, output} from '@angular/core';
import { Task } from '../task';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-ajout-tache-template-driven',
  imports: [FormsModule],
  templateUrl: './ajout-tache-template-driven.html',
  styleUrl: './ajout-tache-template-driven.css',
})
export class AjoutTacheTemplateDriven {

  nouvelleTache = output<Task>();

  // Model sur lequel est basé le formulaire
  model : Partial<Task> = { // Typage avec Partial<X> pour montrer cette syntaxe
    libelle : '',
    done : false
  }

  // Méthode qui s'execute au submit du formulaire
  onSubmit(form: NgForm) {
      const tache: Task = {
        id: 0,
        description: '',
        libelle : this.model .libelle || '',
        done : this.model.done || false
      };

      this.nouvelleTache.emit(tache); // Émission de la tâche à créer au parent avec le output
      form.resetForm(); // Remise à zéro du formulaire
  }

}
