# Correction étape par étape des différents TP

## TP 7.2 - Validation d'un formulaire template driven

Dans le composant AjoutTacheTemplateDriven :

1. Rendre le champ `libelle` :  
    → obligatoire  
    → nécessitant entre 5 et 20 caractères 
    ```html
    <form #form="ngForm" (ngSubmit)="onSubmit(form)">
    <div>
        <label>Libellé</label>
        <input type="text" name="libelle" [(ngModel)]="model.libelle" 
        required minlength="5" maxlength="20"/> // 👈
    </div>

    <div>
        <label>Terminé</label>
        <input type="checkbox" name="done" [(ngModel)]="model.done" />
    </div>

    <button type="submit">Ajouter</button>
    </form>
    ```


2. Lorsque le champ est invalide :  
    → afficher le label en rouge  
    → mettre les bordures du champ en rouge  
    → afficher un message, en rouge, sous le champ  
    → désactiver le bouton de soumission  
    → empêcher le déclenchement du l'``output``  

      - Commençons par gérer le style ~

         ```html
         <!-- ... -->
         <label  [class.label-invalide]="libelleCtrl.invalid && libelleCtrl.touched">Libellé</label>  <!-- 👈 -->
         <input type="text" name="libelle" [(ngModel)]="model.libelle" 
             required minlength="5" maxlength="20"  <!-- 👈 -->
             [class.input-invalide]="libelleCtrl.invalid && libelleCtrl.touched" <!-- 👈 -->
             #libelleCtrl="ngModel" />  <!-- 👈 --> <!-- Requis pour pouvoir vérifier la validité de ce champ -->
         <!-- ... -->
         ```
         >Angular met à disposition `[ngClass]` **MAIS Angular ne préconise plus son utilisation depuis Angular 20** 
         ↔ Il faut donc utiliser `[class.nom-class-css]="maCondition`

         et 

         ```css
         /* Champ invalide */
         .input-invalide {
             border-color: red;
         }

         /* Label en erreur */
         .label-invalide {
             color: red;
         }

         /* Texte d’erreur */
         .msg-erreur {
             color: red;
         }
         ```

      - Maintenant, gérons les messages d'erreurs et la désactivation du bouton 

         ```html
         <form #form="ngForm" (ngSubmit)="onSubmit(form)">
             <div>
                 <label  [class.label-invalide]="libelleCtrl.invalid && libelleCtrl.touched">Libellé</label>
                 <input type="text" name="libelle" [(ngModel)]="model.libelle" 
                 required minlength="5" maxlength="20" 
                 [class.input-invalide]="libelleCtrl.invalid && libelleCtrl.touched"
                 #libelleCtrl="ngModel" />

                 <!-- 👇 -->
                 @if (libelleCtrl.invalid && libelleCtrl.touched) {
                 <div class="msg-erreur">

                     @if (libelleCtrl.hasError('required')) {
                     <div>Le libellé est obligatoire.</div>
                     }

                     @if (libelleCtrl.hasError('minlength')) {
                     <div>Le libellé doit contenir au moins 5 caractères.</div>
                     }

                     @if (libelleCtrl.hasError('maxlength')) {
                     <div>Le libellé ne peut pas dépasser 20 caractères.</div>
                     }

                 </div>
                 }
             </div>
             <!-- ... -->
             <button type="submit"
                     [disabled]="form.invalid">
                 Ajouter
             </button>
         </form>
         ```
      - Pour empêcher le déclanchement de l'``output``, il faut ajouter une condition dans la méthode `onSubmit` :
        ```ts
        onSubmit(form: NgForm) {
            if ( form.invalid ) { 
                return; 
            }
            /* ... */
        }
        ```


3. Bonus : Le champ libelle est invalide si sa valeur est égale au libelle d'une tâche existante (utilisez toLowerCase pour la comparaison)
    > Rappel : **Un Service est garant des données dont il est responsable** : C'est donc au `GestionTacheService` de faire cette vérification : 
    ```ts
    @Injectable({ /* ... */ })
    export class GestionTacheService {
        /* ... */

        libelleExiste(libelle: string): boolean {
            // Retournera true si au moins 1 élément à le même libellé que le paramètre de la méthode
            return this.taches.some(t => t.libelle.toLowerCase() === libelle.toLowerCase()); 
        }
    }
    ```
    - Ensuite, il faut créer un validateur Custom :
        ```bash
        ng g d to-do-list/libelle-unique-validator
        ```
        ```ts
        @Directive({
            selector: '[appLibelleUniqueValidator]',
            providers: [
                {
                    provide: NG_VALIDATORS, // 👈
                    useExisting: LibelleUniqueValidator, // 👈
                    multi: true // Très important de garder le `multi:true`  // 👈
                }
            ]
        })
        export class LibelleUniqueValidator implements Validator { // 👈

            private gestionTaches = inject(GestionTaches); // 👈

            validate(control: AbstractControl): ValidationErrors | null {  // 👈
                const libelle = control.value ?? '';

                if (!libelle.trim()) {
                return null; // Ne pas valider si vide car rôle du validator `required`
                }

                return this.gestionTaches.libelleExiste(libelle) ? { libelleExiste: true } : null;
            }
        }
        ```
    - Et enfin, il faut utiliser ce validateur
        ```ts
        @Component({
            selector: 'app-ajout-tache-template-driven',
            imports: [/* ... */ , LibelleUniqueValidator], // 👈
            templateUrl: './ajout-tache-template-driven.html',
            styleUrl: './ajout-tache-template-driven.css'
        })
        export class AjoutTacheTemplateDriven { /* ... */ }
        ```

        ```html
        <div>
            <label  [class.label-invalide]="libelleCtrl.invalid && libelleCtrl.touched">Libellé</label>
            <input type="text" name="libelle" [(ngModel)]="model.libelle" 
            required minlength="5" maxlength="20" 
            [class.input-invalide]="libelleCtrl.invalid && libelleCtrl.touched"
            appLibelleUniqueValidator  <!-- 👈 -->
            #libelleCtrl="ngModel" /> <!-- Requis pour pouvoir vérifier la validité de ce champ -->

            <!-- MESSAGES D’ERREUR -->
            @if (libelleCtrl.invalid && libelleCtrl.touched) {
            <div class="msg-erreur">
                <!-- ... -->
                @if (libelleCtrl.hasError('libelleExiste')) {  <!-- 👈 -->
                <div class="msg-erreur">Ce libellé existe déjà.</div>
                }

            </div>
            }
        </div>
        ```

****
## TP 7.1 - Formulaire template driven

1. Créer le composant `ajout-tache-template-driven`
    ```bash
    ng generate component to-do-list/ajout-template-driven
    ```

2. Dans le composant `AjoutTacheTemplateDriven` :
    - Créer un formulaire contenant :  
        → un champ pour saisir le libelle de la tâche
        → un champ pour indiquer l'état done de la tâche
        → un bouton de soumission
    - Créer un output `nouvelleTache`
    - À la soumission du formulaire, créer un objet de type Tache et l'envoyer via l'``output``

        - Il faut tout d'abord définir le model sur lequel se baser pour notre formulaire : 
        ```ts
        import { Task } from '../task'; // 👈

        @Component({ /* ... */ })
        export class AjoutTacheTemplateDriven {
            model : Partial<Task> = { // 👈
                libelle : '',
                done : false
            }
        }
        ```
        >Ici, le choix d'avoir typé model avec `Partial<Task>` est purement pour montrer cette syntaxe 😁  
        `Partial<X>` permet de typer un élément qui contiendra que des attributs en commun avec l'interface `X`, mais ils seront tous facultatifs  
        ↔ `Partial<X>` est une interface qui définit tous les attributs de `X` mais leur type n'est plus `: Y` mais `: Y | undefined`
        - Puis importer le `FormsModule` afin de pouvoir définir un formulaire template-driven dans le HTML
        ```ts
        @Component({
            selector: 'app-ajout-tache-template-driven',
            imports: [FormsModule], // 👈
            templateUrl: './ajout-tache-template-driven.html',
            styleUrl: './ajout-tache-template-driven.css',
        })
        export class AjoutTacheTemplateDriven { /* ... */ }        
        ```
        - Il faut ensuite définir le formulaire dans le HTML
        ```html
        <form #form="ngForm" (ngSubmit)="onSubmit(form)">
        <div>
            <label>Libellé :</label>
            <input type="text" name="libelle" [(ngModel)]="model.libelle" />
        </div>

        <div>
            <label>Terminé :</label>
            <input type="checkbox" name="done" [(ngModel)]="model.done" />
        </div>

        <button type="submit">Ajouter</button>
        </form>
        ```
        - Et enfin, il faut définir le `output` et émettre le formulaire lors de la soumission
        ```ts
        @Component({
            selector: 'app-ajout-tache-template-driven',
            imports: [FormsModule],
            templateUrl: './ajout-tache-template-driven.html',
            styleUrl: './ajout-tache-template-driven.css',
        })
        export class AjoutTacheTemplateDriven {

            nouvelleTache = output<Task>(); // 👈

            model : Partial<Task> = {
                libelle : '',
                done : false
            }

            onSubmit(form: NgForm) { // 👈
                const tache: Task = {
                    id: 0,
                    description: '',
                    libelle : this.model .libelle || '',
                    done : this.model.done || false
                };

                this.nouvelleTache.emit(tache);
                form.resetForm();
            }

        }
        ```


3. Dans le service `GestionTache` :
    - Créer une méthode enregistrer permettant d'ajouter une tâche à la liste
        ```ts 
        @Injectable({ providedIn: 'root' })
        export class GestionTaches {
            enregistrer(tache: Task) { // 👈
                this.tasks.push(tache);
            }
        }
        ```


4. Dans le composant `ToDoList` :
    - Ajouter le composant `AjoutTacheTemplateDriven` en haut de l'écran
    - À la réception d'un événement `nouvelleTache`, appeler la méthode enregistrer du service
  
      - Dans le HTML, ajouter le component `AjoutTacheTemplateDriven` à l'aide de son selector : 
        ```html
        <app-ajout-tache-template-driven />

        /* ... */
        ```
        > Il faut bien penser à importer ce component dans le TypeScript du `ToDoList`

        ```ts
        @Component({
            selector: 'app-to-do-list',
            imports: [/* ... */ , AjoutTacheTemplateDriven], // 👈
            templateUrl: './to-do-list.html',
            styleUrl: './to-do-list.css',
        })
        export class ToDoList implements OnInit{ /* ... */ }
        ```
      - Réagir lors de la réception de l'évenement du `output` en appelant la méthode du service 
        ```ts
        @Component({ /* ... */ })
        export class ToDoList implements OnInit{ 
            /* ... */ 
            
            ajouterTache(tache: Task) { // 👈
                this.gestionTaches.enregistrer(tache);  // 👈
            }
        }
        ```
        ```html
        <app-ajout-tache-template-driven 
            (nouvelleTache)="ajouterTache($event)"/> <!-- 👈 -->
        ```


****
## TP 6.2 - Un composant `Tache` pour représenter une tâche

1. Créer un nouveau composant **`tache`**
    ```bash
    ng g c to-dodo-list/tache
    ```

2. Dans le composant **`Tache`** :
    - Créer un `input` obligatoire **`tache`** _(`Task`)_
    ```ts
    @Component({/* ... */})
    export class Tache {
        readonly tache = input.required<Task>();
    }
    ```
    - Faire le template pour afficher la `tache`
    > Consulter le fichier CSS du composant `Tache` pour le design
    ```html
    <div class="media" [class.done]="tache().done">
      <div class="title">
        {{tache().libelle}}
      </div>
      <div class="body">
        {{tache().description}}
      </div>
      @if (tache().done) {
        <div class="badge">
          <span title="Tâche terminée">✔️</span>
        </div>
      }
    </div>
    ```
3. Dans le composant **`ToDoList`**, afficher chaque tâche avec le composant **`Tache`**
    > Consulter le fichier CSS du composant `ToDoList` pour le design
    ```html
    @for (tsk of tasks; track tsk.id) {
        <app-tache [tache]="tsk" />
    }
    ```

4. Dans le service **`GestionTache`** :
    - Ajouter une méthode **`toggle`**  
    &rarr; acceptant l'**identifiant** d'une tâche en paramètre  
    &rarr; qui inverse la valeur **`done`** de la tâche ayant l'identifiant spécifié
    ```ts
    @Injectable({/* ... */})
    export class GestionTaches {
        // ...

        toggle(id: number): void {
            const tsk = this.tasks.find((t) => t.id === id);
            if (tsk) {
                tsk.done = !tsk.done;
            }
        }
    }
    ```

5. Dans le composant **`Tache`** :
    - Créer un `output` **`terminee`**
    ```ts
    @Component({/* ... */})
    export class Tache {
        // tache
        readonly terminee = output();
    }
    ```
    - Ajouter un bouton dont le texte est conditionné à la valeu de **`done`** :  
    &rarr; **`true` :** Marquer comme terminée  
    &rarr; **`false` :** Marquer comme non terminée
    ```html
    <button>
        @if (tache().done) {
            Marquer comme non terminée
        }
        @else {
            Marquer comme terminée
        }
    </button>
    ```
    - Au clic sur le bouton, déclencher l'`output` **`terminee`**
    ```ts
    @Component({/* ... */})
    export class Tache {
        // ...
        toggle(): void {
            this.terminee.emit();
        }
    }
    ```
    ```html
    <button (click)="toggle()">...</button>
    ```
6. Dans le composant **`ToDoList`** :
    - Quand l'`output` d'une tâche est déclenché, appeler la méthode **`toggle`** de **`GestionTache`**
    ```ts
    toggle(id: number): void {
        this.gestionTaches.toggle(id);
    }
    ```
    ```html
    @for (tsk of tasks; track tsk.id) {
        <app-tache ... (terminee)="toggle(tsk.id)" />
    }
    ```

****
## TP 6.1 - Communication indirecte (service)

1. Créer une interface **`Task`** dans le dossier **`src/app/to-do-list`** avec des attributs :
    - **`id`** _(`number`)_
    - **`libelle`** (`string`)
    - **`description`** _(`string`)_
    - **`done`** _(`boolean`)_
2. Générer un service **`gestion-taches`** dans le dossier **`to-do-list`**
3. Dans le service **`GestionTaches`** :
    - Initialiser un attribut privé **`tasks`** _(`Task[]`)_
    - Valoriser l'attribut **`tasks`** **avec la liste de la slide suivante**
    - Créer une méthode **`getTaches`** retournant les valeurs de **`tasks`**
4. Dans le composant **`ToDoList`** :
    - Injecter le service **`GestionTaches`** et récupérer la liste de tâches dans un attribut **`tasks`** _(`Task[]`)_ 
    - Afficher la liste de tâches issues du service dans le template

****
## TP 5.4 - Navigation avec paramètres

Dans le composant `ToDoList` :

1. Déclarer l'attribut `showDone` de type `boolean`
    > Comme dans le futur, cet attribut sera utilisé dans le HTML (étape 4), sa visibilité doit être `protected`
    ```ts
    @Component({ /* ... */})
    export class ToDoList {
        protected showDone : boolean = false;
    }
    ```

2. Ajouter l'implémentation à OnInit sur votre composant `ToDoList`
    - Ajouter l'implémentation à `OnInit`.  
    - ⚠ Il ne faut pas oublier d'importer `OnInit` depuis `angular/core`
    ```ts
    import { Component, OnInit } from '@angular/core'; 👈
    @Component({ /* ... */})
    export class ToDoList  implements OnInit{
        protected showDone : boolean = false;
    }
    ```
    - Définir la méthode `ngOnInit` demandé par `OnInit` :
    ```ts
    @Component({ /* ... */})
    export class ToDoList  implements OnInit{
        protected showDone : boolean = false;

        ngOnInit(): void { } 👈
    }
    ```

3. Dans la méthode `ngOnInit`, récupérer la valeur du `QueryParam` `done` et la stocker dans `showDone`  
- attribuer `false` si le paramètre n'est pas renseigné
  - Injecter les service Angular `ActivatedRoute`   
    ⚠ Il ne faut pas oublier d'importer `inject` et `ActivatedRoute`
    ```ts
    import { Component, inject, OnInit } from '@angular/core'; 👈
    import { ActivatedRoute } from '@angular/router'; 👈

    @Component({ /* ... */ })
        export class ToDoList implements OnInit{

        private route = inject(ActivatedRoute); 👈

        protected showDone : boolean = false;
        ngOnInit(): void {}
    }
    ```
  - Récupérer, en s'abonant aux changements, un `QueryParam` `done`, dans l'attribut `showDone`
    > `params['done']`, s'il est renseigné, est une chaîne de caractères.  
    Or, nous voulons récupérer la valeur sous forme de `boolean` (car une chaîne de caractères est `Truthy`).  
    Une solution est par exemple de comparer `params['done']` avec une valeur voulue en `QueryParam`  
    Par exemple : `params['done'] === 'true'`
    ```ts
        @Component({ /* ... */ })
        export class ToDoList implements OnInit{
            private route = inject(ActivatedRoute); 
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
    ```
    
    

4. Dans le template, créer des **boutons** conditionné à la valeur de **`showDone`**  
- `true` : "Masquer les tâches terminées"
- `false` : "Toutes les tâches"
    - Dans le `to-do-list.html`, utiliser le `@if` / `@else` pour conditionner l'affichage d'un bouton 
    ```jsx
    @if (showDone) {
        <button>Masquer les tâches terminées</button>
    } @else {
        <button>Toutes les tâches</button>
    }
    ```

5.  Au clic sur le bouton, naviguer vers la route permettant de modifier la valeur de `showDone`
    - Importer `RouterLink` dans le `to-do-list.ts` afin d'effectuer des navigations
    ```ts
    import { ActivatedRoute, RouterLink } from '@angular/router'; 👈

    @Component({
        selector: 'app-to-do-list',
        imports: [RouterLink], 👈
        templateUrl: './to-do-list.html',
        styleUrl: './to-do-list.css',
    })
    export class ToDoList implements OnInit /* ... */ }
    ```
    - Effectuer les navigations dans le HTML
    ```jsx
    @if (showDone) {
        <button routerLink="/to-do-list" [queryParams]="{done: 'false'}">Masquer les tâches terminées</button>
    } @else {
        <button routerLink="/to-do-list" [queryParams]="{done: 'true'}">Toutes les tâches</button>
    }
    ```


****
## TP 5.3 - Navigation

1. Créer un composant `navigation`
   - Lancer la commande de la CLI Angular pour générer un component : `ng generate component shared/navigation` (ou `ng g c shared/navigation`)

2. Afficher le composant `Navigation` dans le template du composant `App`
    > 💡 Pour une bonne UX, la barre de navigation doit être en haut des écrans, donc avant la balise permettant l'affichage des différents écrans
    - Utiliser le selecteur du composant `Navigation` dans le `app.html`
    ```html
    <app-navigation/> 👈
    <router-outlet/>
    ```
    > Ne pas oublier d'importer `Navigation` dans le `app.ts`
    ```ts
    @Component({
        selector: 'app-root',
        imports: [RouterOutlet, Navigation], 👈
        templateUrl: './app.html',
        styleUrl: './app.css'
    })
    export class App { /* ... */ }
    ```

3. Dans le composant `Navigation` :
- Créer un lien "Tâches" qui redirige vers la route `to-do-list`
- Créer un lien "À propos" qui redirige vers `presentation`
    - Importer `RouterLink` dans `navigation.ts` afin de pouvoir effectuer des redirections natives dans le HTML
    - Définir la barre de navigation : 
    ```html
    <nav>
        <a routerLink="to-do-list">Tâches</a> <!--Lien vers l'écran ToDoList -->
        <a routerLink="presentation">À propos</a> <!--Lien vers l'écran Presentation -->
    </nav>
    ```
    - En bonus, un peu de style dans le `navigation.css`
    ```css
    nav {
        height: 3rem;

        display: flex;
        gap:2.5rem;
        justify-content: center;
        align-items: center;

        border-bottom: 3px solid var(--page-color);
    }

    a {
        color: var(--link-color);

        font-size: 1.2rem;
        font-weight: bold;
    }

    a:hover {
        color: var(--link-color-hover);
    }
    ```


****
## TP 5.2 - Compléter le routing de l'application

1. Lors de l'accès à la route `''`, rediriger vers la route `to-do-list`
   - Dans le `app.routes.ts`, définir une nouvelle route :  
   ```ts
    /* ... */
    export const routes: Routes = [
        /* ... */
        { 
            path: '',
            redirectTo: '/to-do-list',
            pathMatch: 'full'
        },
    ];
    ```
    > Ne pas oublier le `pathMatch: 'full'`

2. Générer un component `not-found` dans le dossier `src/app/shared`
   - Lancer la commande de la CLI Angular pour générer un component : `ng generate component shared/not-found` (ou `ng g c shared/not-found`)

3. Créer une route `not-found` pour afficher le component `NotFound`
   - Dans le `app.routes.ts`, définir une nouvelle route :  
   ```ts
    import { NotFound } from './shared/not-found/not-found';
    /* ... */
    export const routes: Routes = [
        /* ... */
        {
            path:'not-found',
            component: NotFound
        }
    ];
    ```

4. Rediriger vers la route `not-found` si l'url n'est pas reconnue
 - Dans le `app.routes.ts`, définir une nouvelle route :  
   ```ts
    /* ... */
    export const routes: Routes = [
        /* ... */
        { 
            path: '**',
            redirectTo: '/not-found',
            pathMatch: 'full'
        },
    ];
    ```
    > ⚠ **Cette route doit absoluement être la dernière définie !**

****
## TP 5.1 - Créer 2 écrans

1. Supprimer l'import du composant `Presentation` dans template du composant `App`   
    - Dans le `app.html`, supprimer la balise qui affichait le composant `Presentation` : `<app-presentation/>`
    - Dans le `app.ts`, supprimer l'import au composant `Presentation` :
    ```ts
    @Component({
        selector: 'app-root',
        imports: [], 👈
        templateUrl: './app.html',
        styleUrl: './app.css'
    })
    export class App { /* ... */ }
    ```
    
2. Générer un composant `to-do-list`  
    - Lancer la commande de la CLI Angular pour générer un component : `ng generate component to-do-list` (ou `ng g c to-do-list`)

3. Créer la route `presentation`, affichant le component `Presentation`
    - Dans le `app.routes.ts`, définir une nouvelle route : 
    ```ts
    /* ... */
    import { Presentation } from './presentation/presentation'; 👈

    export const routes: Routes = [
        {
            path: 'presentation', 👈
            component : Presentation 👈
        }
    ];
    ```


4. Créer la route `to-do-list`, affichant le component `ToDoList`  
    - Dans le `app.routes.ts`, définir une nouvelle route : 
    ```ts
    /* ... */
    import { ToDoList } from './to-do-list/to-do-list'; 👈

    export const routes: Routes = [
         /* ... */
        {
            path: 'to-do-list', 👈
            component : ToDoList 👈
        }
    ];
    ```

5. Définir où afficher les routes au sein du composant `App`
   - Dans le `app.html`, ajouter la balise `<router-outlet/>` pour indiquer où les écrans devront être affiché dans le `App`
   - Si vous l'aviez supprimé depuis que vous avez supprimé le contenu initial du `App`, il faut importer `RouterOutlet` dans le `app.ts` :
    ```ts
    @Component({
        selector: 'app-root',
        imports: [RouterOutlet], 👈
        templateUrl: './app.html',
        styleUrl: './app.css'
    })
    export class App { /* ... */ }
    ```


6. Testez vos routes via les URL suivantes :
   - http://localhost:4200/presentation
   - http://localhost:4200/to-do-list 
    > Il faut bien accéder manuellement à ces URL
  
    
****
## TP 4.2 - Tableau des compétences

Dans le composant `Presentation` :

1. Supprimer l'appel au `console.log`
    ```ts
    @Component({ /* ... */})
    export class Presentation {
        competencesService = inject(Competences); 
        /* ... */*

        // Supprimer le console.log et nous n'avons plus besoin du constructeur 👇
        //constructor() {
            // console.log("Contenu de mon tableau de compétences ! ", this.competencesService.competences); 
        // }
    }
    ```

2. Passer l'injection du service `Competences` avec une visibilité `private`
   > La bonne pratique est de ne jamais utiliser un service dans le HTML d'un composant.  
    Il faut donc mettre le service en private et manipuler les attibuts / méthodes d'un service
    depuis le TypeScript d'un composant
    ```ts
    @Component({ /* ... */})
    export class Presentation {
        private competencesService = inject(Competences); 
        /* ... */
    }
    ```

3. Récupérer les données du service `Competences` dans un attribut  
    - Créer un attribut dans le TypeScript, sous l'injection du service, valorisé avec la valeur de l'attribut `competences` du service `Competences`
    ```ts 
    @Component({ /* ... */ })
    export class Presentation {
        private competencesService = inject(Competences);
        protected competences : Competence[] = this.competencesService.competences;
        /* ... */
    }
    ```
    > Cet attribut devant être utilisé dans le HTML par la suite, sa visibilité doit être protected


4. Afficher les données dans le tableau des compétences
    - Utiliser `@for( <!-- ... -->)`  pour afficher 1 ligne par compétence du tableau de compétence
    - Afficher la liste des valeurs de chaque compétences via la méthode Javascript `.join`
    Dans le `presentation.html`, on a donc :
    ```jsx
    <section id="skills">
        <h2>Compétences Techniques</h2>
        <table>
            <tbody>
                @for (competence of competences; track competence.categorie) { 👈
                    <tr>
                        <td>{{competence.categorie}}</td> 👈
                        <td>{{competence.valeurs.join(', ')}}</td> 👈
                    </tr>
                }
            </tbody>
        </table>
    </section>
    ```


****
## TP 4.1 - Afficher les données

Dans le composant `Presentation` :

1. Créer 2 attributs `nom` et `prenom` (string) :  
    - Les 2 attributs doivent être définit dans le `presentation.ts`.  
    Comme ils devront être affiché dans le HTML, mais non accessible à l'exterieur de `Presentation`, leur visibilité doit être `protected`
    ```ts
    protected nom :string;
    protected prenom :string;
    ```
    > ⚠ À cette étape, vous devriez avoir une erreur de compilation TypeScript : 
    `Property 'xxxx' has no initializer and is not definitely assigned in the constructor.`  
    Cette erreur survient car aucune valorisation n'a été donnée à ces attributs, donc leur type réel est `undefined`. Or, cela ne correspond pas au type `string` demandé.  
    Il faut alors répondre à la question suivante pour corriger cette erreur 😁

2. Renseigner les attributs :
    ```ts
    protected nom :string = 'Dupont';
    protected prenom :string = 'Jean';
    ```

3. Afficher ces attributs dans le header :  
   - Dans le `presentation.html`, remplacer les nom / prénom qui étaient présents dans la balise `h1` du `header` par les attributs du TypeScript
    ```html
    <header>
        <h1>{{prenom}} {{nom}}</h1> 👈
        <p>Ingénieur Front-End</p>
    </header>
    <!-- ... Reste de la page ... -->
    ```

****
## TP 3.1 - Créer un service

1. Générer une interface **`competence`** avec les propriétés : **`categorie`** (**`string`**) / **`valeurs`** (**`string[]`**)
    - Créer un fichier TypeScript dans le dossier demandé (`competence.ts`)
    - Initialiser l'interface sans aucun attribut : `export interface Competence { /* ... Futur contenu de mon interface ... */ }`
    > Pour éviter de faire manuellement ces 2 étapes, la CLI Angular met à votre disposition une commande : `ng generate interface <nom-interface>`
    - Completer cette interface avec les attributs demandés : 
    ```ts
    export interface Competence {
        categorie : string; // 👈
        valeurs : string[]; // 👈
    }
    ```

2. Générer un service **`competences`** + Créer un attribut de type **`Competence[]`** et y insérer des données
    - Utiliser la commande de la CLI Angular afin de générer un nouveau service, nommé Competences : `ng generate service presentation\competences`
    > Comme ce service ne sera utilisé que dans la fonctionnalité `presentation`, il faut le créer dans le bon répertoire.
    - Créer un attribut dans le service et expliciter son type : 
    ```ts
    @Injectable({ /* ... */ })
    export class Competences {
        competences : Competence[] = [ /* ... Éléments du tableau ... */ ]; 👈
    }
    ```
    > Si vous avez `Competences[]` de souligné en rouge sur votre IDE, n'oubliez pas d'importer l'interface créée en question 1 dans votre service : `import { Competence } from './competence';`
    Et voila avec le tableau complété : 
    ```ts
    @Injectable({ /* ... */ })
    export class Competences {
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
    ```

3. Dans le composant **`Presentation`** : Injecter le service **`Competences`** + Appeler **`console.log`** à l'initialisation du composant, pour afficher les données de `competences` dans la console (F12) :
    - Injecter le service dans le composant `Presentation` : 
    ```ts
    @Component({ /* ... */})
    export class Presentation {
        competencesService = inject(Competences);
    }
    ```
    > Si `inject` est souligné en rouge par votre IDE, n'oubliez pas d'ajouter son import dans ce composant `import {/* ... */ inject } from '@angular/core';`
    - Appeler **`console.log`** à l'initialisation du composant : 
    ```ts
    @Component({ /* ... */ })
    export class Presentation {
        competencesService = inject(Competences);

        constructor() { 👈
            console.log(
                "Contenu de mon tableau de compétences ! ",
                this.competencesService.competences); 👈
        }
    }
    ```
    > La méthode console.log peut prendre plusieurs paramètres de différents format afin dafficher plusieurs éléments en 1 appel
    ⚠ Pour que le tableau s'affiche correctement, il ne faut pas qu'il soit dans une chaîne de caractères, comme ici 😁
    - Tester 🤘 : 
    Dans votre navigateur, avec votre application Angular lancé (`ng serve`), ouvrir la console (Souvent via `F12`, ou `Clic droit` -> `Inspecter`, onglet `Console`) : 
    ![](/assets/3.1-console.png)

****
## TP 2.2 - Reprendre les TP HTML et CSS

1. Afficher le composant `Presentation` dans le template de `App`
    - Supprimer le continu initial du App.html
    - Ajouter le selecteur du component `Presentation` dans le App.html
    ```html
    <!-- PLus rien d'autre dans ce fichier -->
    <app-presentation/>
    ```
    > Normalement (si votre IDE ne fait pas tout tout seul 😉) vous devriez avoir une erreur `"NG8001: 'app-presentation' is not a known element"` 
    > -> Votre component `App` ne connait pas le component `Presentation` -> Il faut donc explicitement lui dire d'importer ce dernier 👇
    - Importer le component `Presentation` dans le component `App` 
    ```ts
    @Component({
        imports: [Presentation], 👈
        /* ... */
    })
    export class App { /* ... */ }
    ```

2. Reprendre le TP HTML dans le composant `Presentation`
    > ⚠️ Angular est un framework SPA -> Il ne faut pas copier tous le fichier HTML : Seulement le contenu du body 
    > N'hésitez pas à re-regarder le index.html pour revoir la base du fichier `html` commun pour toute l'application 
    - Copier le contenu du `<body>` du TP HTML dans le fichier `presentation.html`

3. Reprendre le TP CSS dans le composant `Presentation`
    - Copier le contenu du TP CSS dans le fichier `presentation.css`
    > ⚠️ Mince... Tout le CSS n'est pas forcement prit en compte... -> Les fichiers de styles par component ne s'appliquent qu'au composant en question : Pour les styles appliqués sur des balises parent du component dans le DOM, il faut les placer dans le fichier `styles.css`
    > S'il y a des styles globaux, utilisés dans plusieurs component, il faut également les placer dans le `styles.css`
    - Placer les styles dans les bons fichiers afin d'avoir le styles appliqués comme pendant le TP CSS 😊

****

## TP 2.1 - Générer un component

> 💡Pour lancer toutes les commandes de CLI dans une application (Exemple : Génération d'un nouveau component), votre terminal doit pointer sur le dossier **à la source de votre nouvelle appli** (là où il y a le `package.json` 😉) - Exemple `cd to-do-list-app/`

1. Générer un composant `presentation`
    - Lancer la commande de la CLI Angular pour générer un component : `ng generate component presentation` (ou `ng g c presentation`)

2. Trouver le composant dans le projet
    - Le composant généré se trouve dans le dossier `to-do-list-app/src/app/presentation` : On y retouve les 4 fichiers qui composent ce composant (cf. cours)

À la fin de ce  TP, il est normal que vous n'affichiez pas ce component sur votre http://localhost:4200/ -> RDV au prochain TP 😊


****

## TP 1.2 - Lancer l'application générée

1. Lancer le serveur
    - Dans le terminal, placez vous **au niveau de la source de votre nouvelle appli** (là où il y a le `package.json` 😉) - Exemple `cd to-do-list-app/`
    - Lancer la commande de la CLI Angular pour lancer votre application : `ng serve` (ou `ng s`)

2. Afficher l'application
   - Après le build de l'application, vous devriez voir écrit `"Local:   http://localhost:4200/"` vous indiquant que votre application est accessible sur cette URL. Vous pouvez alors lancer cette URL (ou taper `"o"` dans le terminal) afin d'accéder à l'application buildée et lancée.


****

## TP 1.1 - Créer une nouvelle application Angular

1. Installer la CLI Angular
    - Assurez vous d'avoir un poste de dev prêt pour commencer 😊 (Node, IDE, git, etc.)
    - Dans un terminal (n'importe ou sur votre PC), exécuter la commande `npm i -g @angular/cli` -> Permet d'installer la dernière version de la CLI Angular de manière globale sur votre poste  
    Cette commande doit être executé à chaque nouvelle version d'Angular

2. Générer une application `to-do-list-app`
    - Ouvrez votre IDE dans le repertoire où votre application doit être générée
    - Dans le terminal de votre IDE, executer la commande de la CLI Angular pour générer une nouvelle application : `ng new to-do-list-app` 
    - Répondez au différentes questions
      - _Which stylesheet format would you like to use?_ -> **CSS**
      - _Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)?_ -> **No** (Dans ces TP, on ne souhaite pas déléguer le rendu HTML / CSS au niveau d'un serveur)
      - _Des questions propres à la version sur laquelle vous êtes_ -> **No** (Souvent des fonctionnalités en Developer Preview / Non complètes / AVec des limites)
      - _Which AI tools do you want to configure with Angular best practices?_ -> **None** (On est là pour apprendre 😊)


À la fin de votre TP 1.1, vous devriez voir dans votre terminal plusieurs lignes `"CREATE to-do-list-app/xxxxx"` puis l'installation des différentes dépendances de votre application se fait (`"Installing packages (npm)..."`).  
Cette installation est finie lorsque la log passe à `" Packages installed successfully."`

****