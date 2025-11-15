import { Component, inject } from '@angular/core'; // Ne pas oublier de mettre à jour l'import pour injecter le service
import { Competences } from './competences';
import { Competence } from './competence';

@Component({
  selector: 'app-presentation',
  imports: [],
  templateUrl: './presentation.html',
  styleUrl: './presentation.css',
})
export class Presentation {

  // La bonne pratique est de ne jamais utiliser un service dans le HTML d'un composant.
  // Il faut donc mettre le service en private et manipuler les attibuts / méthodes d'un service
  // depuis le TypeScript d'un composant
  private competencesService = inject(Competences); // Injection de l'instance du service `Compentence` dans ce component

  // Cet attribut devant être utilisé dans le HTML, sa visbilité doit être protected
  protected competences : Competence[] = this.competencesService.competences;

  // Création de 2 attributs dans le TypeScript afin de les afficher dans le HTML
  // Leur visibilité doit être protected
  protected nom :string = 'Dupont';
  protected prenom :string = 'Jean';

  
}
