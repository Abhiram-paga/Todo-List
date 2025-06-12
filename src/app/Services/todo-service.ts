import { EventEmitter, inject, Injectable, isStandalone } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, race, Subject } from 'rxjs';
import { ITodoModel } from '../models/todoModel';
import { HttpClient } from '@angular/common/http';
import { UpperCasePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TodoServices {

  http:HttpClient=inject(HttpClient);
  todoList:ITodoModel[]=[];
    
  behaviorObj=new BehaviorSubject<ITodoModel[]>([]);
  todoList$: Observable<ITodoModel[]> = this.behaviorObj.asObservable();


  constructor(){
    this.getTodoList().subscribe((todos)=>{
      this.behaviorObj.next(todos);
    });
  }


  
  onAddTodo(newTodo:ITodoModel): Observable<any> {
    return this.http.post('http://localhost:3000/todoList',newTodo);
  }

  onDeleteTodo(todoId:string){
      return this.http.delete('http://localhost:3000/todoList/'+todoId);
  }


  onStatusChange(todoId:any,updatedObj:ITodoModel){
   return this.http.put('http://localhost:3000/todoList/'+todoId,updatedObj);
  }

  getTodoList(){
    return this.http.get<ITodoModel[]>('http://localhost:3000/todoList');
  }

  onEditTodo(todoId:any,todoTitle:string,todoDes:string,updatedObj:ITodoModel){
   return this.http.put('http://localhost:3000/todoList/'+todoId,updatedObj)
  }

}
