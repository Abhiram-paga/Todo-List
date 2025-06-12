import { Routes } from '@angular/router';
import { Home } from './home/home';


export const routes: Routes = [
    {
        path: 'Home',
        redirectTo: 'todo-list'
    },
    {
        path: 'todo-list',
        loadChildren: () => import('./todo-list/todo-list.routes').then(m => m.TODO_LIST_ROUTES)
    }, {
        path: 'todo-edit/:id',
        loadChildren: () => import('./edit-todo/edit-todo.routes').then(m => m.EDIT_TODO_ROUTES)
    }, {
        path: 'all-tasks',
        loadChildren: () => import('./todo-item/todo-item.routes').then(m => m.TODO_ITEM_ROUTES)
    },
    {
        path: '',
        component: Home
    },
    {
        path: 'inprogress-tasks',
        loadChildren: () => import('./inprogress-tasks/inprogress-tasks.routes').then(m => m.INPROGRESS_ROUTES)
    }
];
