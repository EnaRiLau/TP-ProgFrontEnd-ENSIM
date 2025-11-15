import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-to-do-list',
  imports: [RouterLink],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css',
})
export class ToDoList implements OnInit{

  // Service Angular permettant notamment de récupérer des paramètres d'URL
  private route = inject(ActivatedRoute);

  // Attribut permettant d'indiquer s'il faut afficher les tâches terminées
  protected showDone : boolean = false;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      // Récupération de la potentielle valeur du QueryParam
      // Ici, si `params['done']` n'existe pas, ou si ça valeur est autre chose que `'true'`,
      // alors `showDone` vaudra `false`, sinon, `showDone` vaudra `true`
      this.showDone = params['done'] === 'true';
    });
  }

}
