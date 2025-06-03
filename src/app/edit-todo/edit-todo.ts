import { Component, inject } from '@angular/core';
import { TodoServices } from '../Services/todo-services';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ITodoModel } from '../models/todoModel';

@Component({
  selector: 'app-edit-todo',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './edit-todo.html',
  styleUrl: './edit-todo.scss'
})
export class EditTodo {
  todoTitle:string='';
  todoDescription:string='';
  private taskServices=inject(TodoServices);
  private activatedRoute=inject(ActivatedRoute)

  todoList$=this.taskServices.todoList$;
  obj:any;
  ngOnInit(){
    const activeId=this.activatedRoute.snapshot.paramMap.get('id');
    this.todoList$.subscribe((val)=>{
        this.obj=val.find(eachTodo=>eachTodo.id===activeId);
    })
    
    if(this.obj){
    this.todoTitle=this.obj.todoTitle;
    this.todoDescription=this.obj.todoDescription;
    }
  }

  onSaveBtnClick(){
    const todoId=this.activatedRoute.snapshot.paramMap.get('id');
    const previousList=this.taskServices.behaviorObj.getValue()
    const obj=previousList.find(eachTodo=>eachTodo.id===todoId)!;
    const updatedObj={...obj,todoTitle:this.todoTitle,todoDescription:this.todoDescription}


    this.taskServices.onEditTodo(todoId,this.todoTitle,this.todoDescription,updatedObj).subscribe(()=>{
    const updatedList=this.taskServices.behaviorObj.getValue().map((eachTodo)=>{
     return eachTodo.id===updatedObj.id?updatedObj:eachTodo;
      })
      
      this.taskServices.behaviorObj.next(updatedList);
    });
  }

}
