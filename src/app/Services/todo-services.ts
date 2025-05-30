import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ITodoModel } from '../models/todoModel';

@Injectable({
  providedIn: 'root'
})
export class TodoServices {

   todoList:any=[{
        id:1,
        todoTitle:'Learn HTML',
        todoDescription:'I want to complete the HTML couse at w3Schools by this sunday.',
        isStatusDone:false
    },{
        id:2,
        todoTitle:'Learn JS',
        todoDescription:'I want to complete the JS couse at w3Schools by this sunday.',
        isStatusDone:false
    }
  ];



  CreateTask=new Subject();
  //CreateTask:EventEmitter<any> = new EventEmitter<any>();

  onCreateTask(value:any){
    this.CreateTask.next(value);
  }

  
  onAddTodo(newTodo:ITodoModel){
    this.todoList.push(newTodo);
  }

  onSaveTodoList(){
      localStorage.setItem('todoList',JSON.stringify(this.todoList));
  }

}
