import { EventEmitter, inject, Injectable, isStandalone } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, race, Subject } from 'rxjs';
import { ITodoModel } from '../models/todoModel';
import { HttpClient } from '@angular/common/http';
import { UpperCasePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TodoServices {

  //  todoList:any=[{
  //       id:1,
  //       todoTitle:'Learn HTML',
  //       todoDescription:'I want to complete the HTML couse at w3Schools by this sunday.',
  //       isStatusDone:false
  //   },{
  //       id:2,
  //       todoTitle:'Learn JS',
  //       todoDescription:'I want to complete the JS couse at w3Schools by this sunday.',
  //       isStatusDone:false
  //   }
  // ];

  http:HttpClient=inject(HttpClient);


  constructor(){
    this.getTodoList().subscribe((todos)=>{
      this.behaviorObj.next(todos);
    });
  }


  todoList:ITodoModel[]=[];
    

  behaviorObj=new BehaviorSubject<ITodoModel[]>([]);
  todoList$: Observable<ITodoModel[]> = this.behaviorObj.asObservable();

  
  onAddTodo(newTodo:ITodoModel): Observable<any> {
    return this.http.post('http://localhost:3000/todoList',newTodo).pipe(
      map((res)=>{
        return ({
          res: res,
          name: 'swaroop'
        })
      }), catchError((err)=>{
       return err
      })
    );
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
