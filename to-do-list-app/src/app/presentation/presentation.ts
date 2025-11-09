import { Component, inject } from '@angular/core'; // Ne pas oublier de mettre à jour l'import pour injecter le service
import { Competences } from './competences';

@Component({
  selector: 'app-presentation',
  imports: [],
  templateUrl: './presentation.html',
  styleUrl: './presentation.css',
})
export class Presentation {
  competencesService = inject(Competences); // Injection de l'instance du service `Compentence` dans ce component

  constructor() {
     // Affchage dans la console, lors de la construction de ce component, du tableau de compétence du service
     // La méthode console.log peut prendre plusieurs paramètres de différents format afin dafficher plusieurs éléments en 1 appel
     // ⚠ Pour que le tableau s'affiche correctement, il ne faut pas qu'il soit dans une chaîne de caractères, comme ici 😁
    console.log("Contenu de mon tableau de compétences ! ", this.competencesService.competences);
  }
}
