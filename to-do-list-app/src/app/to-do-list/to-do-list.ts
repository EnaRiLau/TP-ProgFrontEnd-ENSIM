import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GestionTaches } from './gestion-taches';
import { Task } from './task';
import { Tache } from "./tache/tache";
import { AjoutTacheReactiveForms } from "./ajout-tache-reactive-forms/ajout-tache-reactive-forms";

@Component({
  selector: 'app-to-do-list',
  imports: [RouterLink, Tache, AjoutTacheReactiveForms],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css',
})
export class ToDoList implements OnInit{

  // Service Angular permettant notamment de récupérer des paramètres d'URL
  private route = inject(ActivatedRoute);

  // Service Angular permettant de gérer les tâches
  private gestionTaches = inject(GestionTaches);

  // Attribut permettant d'indiquer s'il faut afficher les tâches terminées
  protected showDone : boolean = false;

  // Liste des tâches à afficher
  protected tasks: Task[] = this.gestionTaches.getTaches();

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      // Récupération de la potentielle valeur du QueryParam
      // Ici, si `params['done']` n'existe pas, ou si ça valeur est autre chose que `'true'`,
      // alors `showDone` vaudra `false`, sinon, `showDone` vaudra `true`
      this.showDone = params['done'] === 'true';
    });
  }

  toggle(id: number): void {
    this.gestionTaches.toggle(id);
  }

  ajouterTache(tache: Task) {
    this.gestionTaches.enregistrer(tache);
  }

}
