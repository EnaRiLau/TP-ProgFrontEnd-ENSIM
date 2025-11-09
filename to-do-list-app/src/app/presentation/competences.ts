import { Injectable } from '@angular/core';
import { Competence } from './competence'; // ne pas oublier l'import de l'interface Competence pour pouvoir typer notre attribut

/** TP 3.1 - Question 2 - Créer un service Competences */
@Injectable({
  providedIn: 'root',
})
export class Competences {

  /** 
   * Tableau de compétences, de type Competences[]
   * Chaque élement contient 2 attributs (: categorie et valeurs), tel que définit dans l'interface `Competence`
   */
  competences : Competence[] = [
    {
      categorie : "Langages",
      valeurs : ["HTML5", "CSS3", "JavaScript", "TypeScript"]
    }, 
    {
      categorie : "Frameworks",
      valeurs : ["Angular", "React"]
    },
    {
      categorie : "Bonnes pratiques",
      valeurs : ["Accessibilité", "Ergonomie", "Responsive Design", "Mobile First"]
    }
  ];
}
