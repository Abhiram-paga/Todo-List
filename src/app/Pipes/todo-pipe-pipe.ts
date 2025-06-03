import { Pipe, PipeTransform } from '@angular/core';
import { ITodoModel } from '../models/todoModel';

@Pipe({
  name: 'filterPipe',standalone:true
})
export class filterPipe implements PipeTransform {

  transform(todos:ITodoModel[] | null | undefined,searchText:string): ITodoModel[] {
    if (!todos) return [];
    if(!searchText)return todos;
    return todos.filter((eachTodo)=>eachTodo.todoTitle.toLowerCase().includes(searchText.toLowerCase()));
  }

}
