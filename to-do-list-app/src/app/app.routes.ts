import { Routes } from '@angular/router';
import { Presentation } from './presentation/presentation';
import { ToDoList } from './to-do-list/to-do-list';

export const routes: Routes = [
    {
        path: 'presentation',
        component : Presentation
    },
    {
        path: 'to-do-list',
        component : ToDoList
    }
];
