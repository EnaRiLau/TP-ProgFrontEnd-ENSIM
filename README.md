# Correction étape par étape des différents TP

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