import { Component } from '@angular/core';
import { Header } from '../header/header';
import { TodoList } from '../todo-list/todo-list';

@Component({
  selector: 'app-home',
  imports: [TodoList],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
