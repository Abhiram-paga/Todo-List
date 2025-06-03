import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  RouterOutlet } from '@angular/router';
import { Header } from './header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'todo-list';
}
