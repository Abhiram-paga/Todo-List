import { Routes } from '@angular/router';
import { TodoList } from './todo-list/todo-list';
import { TodoItem } from './todo-item/todo-item';

export const routes: Routes = [
    {
        path: '',
        component: TodoList
    },
    {
        path: 'item',
        component: TodoItem
    }
];
