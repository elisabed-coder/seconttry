import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { toDo } from '../Interfaces/todolist.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todoList: toDo[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getTodoList();
  }

  private getTodoList() {
    this.http
      .get<toDo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe((toDo) => {
        this.todoList = toDo;
        console.log(this.todoList);
      });
  }
  toggleCompletion(todo: toDo): void {
    todo.completed = !todo.completed;
  }
}
