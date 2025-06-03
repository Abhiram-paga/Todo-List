import { Component, inject } from '@angular/core';
import { TodoServices } from '../Services/todo-services';
import { CommonModule } from '@angular/common';
import { ITodoModel } from '../models/todoModel';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filterPipe } from '../Pipes/todo-pipe-pipe';

@Component({
  selector: 'app-todo-item',
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.scss'
})
export class TodoItem {
  
  private destroy$=new Subject<void>();
  searchText:string=''
  taskService:TodoServices=inject(TodoServices)
  paginatedTodoList$!:Observable<ITodoModel[]> 
  constructor(){
    
  }

  currentPage=1;
  todosPerPage=5;
  
  fullTodoList:ITodoModel[]=[];
  paginatedTodos:ITodoModel[]=[];

  filteredtodoList$!:Observable<ITodoModel[]>;
  ngOnInit(){
    // this.taskService.todoList$
    // .pipe(takeUntil(this.destroy$))
    // .subscribe((todos) => {
    //   this.fullTodoList = todos;
    //   this.setPaginatedTodos();
    // });
    this.filteredtodoList$=this.taskService.todoList$.pipe(map((todos)=>this.applyFilter(todos,this.searchText)));
    this.setPaginatedTodos();

    this.taskService.todoList$.pipe(takeUntil(this.destroy$)).subscribe((todos) => {
      this.fullTodoList = todos;
      this.setPaginatedTodos();
    })
  }
  

  applyFilter(todos: ITodoModel[], searchText: string): ITodoModel[] {
  if (!todos) return [];
  if (!searchText) return todos;
  return todos.filter(todo =>
    todo.todoTitle.toLowerCase().includes(searchText.toLowerCase())
  );
}
  setPaginatedTodos() {
 // const filtered= this.applyFilter(this.fullTodoList, this.searchText);
  const startIndex = (this.currentPage - 1) * this.todosPerPage;
  const endIndex = startIndex + this.todosPerPage; 
 // this.paginatedTodos = filtered.slice(startIndex, endIndex);
 this.paginatedTodoList$=this.filteredtodoList$.pipe(map((todos)=>todos.slice(startIndex,endIndex)));
}


onSearchTextChange() {
  this.currentPage = 1;
  this.setPaginatedTodos();
}

onPageChange(page: number) {
  this.currentPage = page;
  this.setPaginatedTodos();
}

get totalPages(): number[] {
  const filtered = this.applyFilter(this.fullTodoList, this.searchText);
  const total = Math.ceil(filtered.length / this.todosPerPage);
  return Array.from({ length: total }, (_, i) => i + 1);
}
  onDeleteTodoItem(todoId:string){
    this.taskService.onDeleteTodo(todoId).pipe(takeUntil(this.destroy$)).subscribe(()=>{
        const filteredList=this.taskService.behaviorObj.getValue().filter((eachTodo)=>eachTodo.id!==todoId);
        this.taskService.behaviorObj.next(filteredList);
      },(error)=>{
        console.error(error);
      });
  }

  onTodoStatusChange(todoId:any){
      const previousList=this.taskService.behaviorObj.getValue()
    const obj=previousList.find(eachTodo=>eachTodo.id===todoId)!;
    const updatedObj={...obj,isStatusDone:!obj.isStatusDone}


    this.taskService.onStatusChange(todoId,updatedObj).pipe(takeUntil(this.destroy$)).subscribe(()=>{
    const updatedList=this.taskService.behaviorObj.getValue().map((eachTodo)=>{
     return eachTodo.id===updatedObj.id?updatedObj:eachTodo;
      })
      
      this.taskService.behaviorObj.next(updatedList);
    },(error)=>{
      console.error(error);
    });
  }

  onEditBtnClick(){
    
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }

}
