import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ITodoModel } from '../models/todoModel';
import { TodoItem } from '../todo-item/todo-item';
import { TodoServices } from '../Services/todo-services';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule,FormsModule,TodoItem],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss'
})
export class TodoList {
  

  taskServices=inject(TodoServices);
  constructor(){
    
  }

  ngDoCheck(){
      this.todoList=this.taskServices.todoList;
  }

    todoTitle:string='';

    todoDescription:string='';

    todoList:ITodoModel[]=[];

   
  onAddTodo() {
    const newTodo:ITodoModel={
      id:this.todoList.length+1,
      todoTitle:this.todoTitle,
      todoDescription:this.todoDescription,
      isStatusDone:false
    }
    this.taskServices.onAddTodo(newTodo);
    // this.todoList.push(newTodo);
    this.todoTitle='';
    this.todoDescription='';

      }



  onSaveTodo(){
    // localStorage.setItem('todoList',JSON.stringify(this.todoList));
  }
}
