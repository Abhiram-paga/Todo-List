import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ITodoModel } from '../models/todoModel';
import { TodoItem } from '../todo-item/todo-item';
import { TodoServices } from '../services/todo-service';
import { Subject, Subscription, takeUntil } from 'rxjs';


@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoItem],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss'
})
export class TodoList {

  onAddTodoSubscription?: Subscription;
  private destroy$ = new Subject<void>();

  taskServices = inject(TodoServices);
  
  todoTitle: string = '';

  todoDescription: string = '';



  onAddTodo() {
    if (this.todoTitle === '') {
      return alert('Enter Title')
    }
    const newTodo: ITodoModel = {
      id: crypto.randomUUID(),
      todoTitle: this.todoTitle,
      todoDescription: this.todoDescription,
      isStatusDone: false
    }
    this.todoTitle = '';
    this.todoDescription = '';

    // this.taskServices.onAddTodo(newTodo).pipe(takeUntil(this.destroy$)).subscribe(()=>{
    //   const addedList=[...this.taskServices.behaviorObj.getValue(),newTodo];
    //   this.taskServices.behaviorObj.next(addedList);
    // })
    this.onAddTodoSubscription = this.taskServices.onAddTodo(newTodo).subscribe({
      next: ((res) => {
        this.taskServices.getTodoList().pipe(takeUntil(this.destroy$)).subscribe((todos) => {
          this.taskServices.behaviorObj.next(todos);
        })
      }),
      error: ((error) => {
        console.error(error)
      })
    })
  }

  ngOnDestroy() {
    if (this.onAddTodoSubscription) {
      this.onAddTodoSubscription.unsubscribe();
    }
  }


}
