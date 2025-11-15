# Correction étape par étape des différents TP

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
    - Et voilà avec le tableau complété : 
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
    - Lancer la commande de la CLI Angular pour pour générer un component : `ng generate component presentation` (ou `ng g c presentation`)

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