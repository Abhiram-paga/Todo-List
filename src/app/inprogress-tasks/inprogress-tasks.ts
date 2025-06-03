import { Component, inject } from '@angular/core';
import { TodoServices } from '../Services/todo-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inprogress-tasks',
  imports: [CommonModule],
  templateUrl: './inprogress-tasks.html',
  styleUrl: './inprogress-tasks.scss'
})
export class InprogressTasks {
    private taskServices=inject(TodoServices);

    todoList$=this.taskServices.todoList$;


}
