import { Component, inject } from '@angular/core';
import { TodoServices } from '../Services/todo-services';
import { CommonModule } from '@angular/common';
import { ITodoModel } from '../models/todoModel';

@Component({
  selector: 'app-todo-item',
  imports: [CommonModule],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.scss'
})
export class TodoItem {
  
  taskService:TodoServices=inject(TodoServices)
  constructor(){
    
  }

  todoList:ITodoModel[]=[];
  ngOnInit(){
     this.todoList=this.taskService.todoList;
  }
 
}
