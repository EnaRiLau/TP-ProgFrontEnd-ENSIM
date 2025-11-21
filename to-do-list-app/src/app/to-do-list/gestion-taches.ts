import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class GestionTaches {

  // Liste des tâches (private pour éviter les manipulations directes)
  private tasks: Task[] = [
    {
      id: 1, done: false, libelle: 'Faire de la veille technologique',
      description: 'Regarder et comprendre les différences entre Angular 20 et Angular 21'
    },
    {
      id: 2, done: true, libelle: 'Mettre en place environnement de développement',
      description: 'Installer Node.js, Angular CLI et VS Code avec les plugins nécessaires pour être prêt pour mon cours'
    },
    {
      id: 3, done: true, libelle: 'Créer un composant Angular',
      description: 'Développer un composant `<app-header>` avec un menu de navigation'
    },
    {
      id: 4, done: false, libelle: 'Documenter le projet',
      description: 'Ajouter de la TsDoc et completer le ReadMe.'
    },
    {
      id: 5, done: false, libelle: 'Intégrer une API REST',
      description: 'Consommer une API pour afficher la liste des `utilisateurs`'
    },
    {
      id: 6, done: true, libelle: 'Mettre en place le routing',
      description: 'Configurer les routes principales de l\'application (Accueil, Produits, Contact)'
    },
    {
      id: 7, done: false, libelle: 'Écrire des tests unitaires',
      description: 'Tester mon application avec Jasmine et Karma'
    }
  ];

  // Méthode permettant de récupérer toutes les tâches en mémoire
  getTaches(): Task[] {
    return this.tasks;
  }

  // Méthode qui inverse l'état d'une tâche
  toggle(id: number): void {
    const tsk = this.tasks.find((t) => t.id === id);
    if (tsk) {
      tsk.done = !tsk.done;
    }
  }

  enregistrer(tache: Task) {
    tache.id = this.tasks.length;
    this.tasks.push(tache);
  }

}
