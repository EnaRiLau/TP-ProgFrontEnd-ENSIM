# Correction étape par étape des différents TP

## TP 1.2 - Générer un component

> 💡Pour lancer toutes les commandes de CLI dans une application (Exemple : Génération d'un nouveau component), votre terminal doit pointer sur le dossier **à la source de votre nouvelle appli** (là où il y a le `package.json` 😉) - Exemple `cd to-do-list-app/`

1. Générer un composant `presentation`
    - Lancer la commande de la CLI Angular pour lancer votre application : `ng generate component presentation` (ou `ng g c presentation`)

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