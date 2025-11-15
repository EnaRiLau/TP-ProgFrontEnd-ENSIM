import { Routes } from '@angular/router';
import { Presentation } from './presentation/presentation';
import { ToDoList } from './to-do-list/to-do-list';
import { NotFound } from './shared/not-found/not-found';

export const routes: Routes = [
    {
        path: 'presentation',
        component : Presentation
    },
    { // Lors de l'accès à la route vide alors on redirige vers la route `to-do-list`, 
    // qui affiche le composant ToDoList
        path: '',
        redirectTo: '/to-do-list',
        pathMatch: 'full' // 👈 Très important pour que toutes les routes définit plus bas fonctionne.
    },
    {
        path: 'to-do-list',
        component : ToDoList
    },
    {
        path:'not-found',
        component: NotFound
    },
    {
        path: '**',
        redirectTo: '/not-found',
        pathMatch: 'full'
    }
];
