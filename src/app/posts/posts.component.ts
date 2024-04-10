import { Component, Inject, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../Model/Task';
import { map } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  showCreateTaskForm: boolean = false;
  http: HttpClient = inject(HttpClient);
  allTasks: Task[] = [];

  OpenCreateTaskForm() {
    this.showCreateTaskForm = true;
  }

  CloseCreateTaskForm() {
    this.showCreateTaskForm = false;
  }

  constructor() {}

  ngOnInit(): void {
    this.fetchAllTasks();
  }

  // CreateTask(data: Task) {
  //   console.log(data);
  //   this.http
  //     .post('https://jsonplaceholder.typicode.com/posts.json', data)
  //     .subscribe((response) => {
  //       console.log(response);
  //     }); upload infomation to server
  // }
  private fetchAllTasks() {
    this.http
      .get<{ [key: string]: Task }>(
        'https://jsonplaceholder.typicode.com/posts'
      )
      .pipe(
        map((response) => {
          // Transfrom data
          let tasks = [];

          for (let key in response) {
            if (response.hasOwnProperty(key)) {
              tasks.push({ ...response[key], id: key });
            }
          }
          return tasks;
        })
      )
      .subscribe((tasks) => {
        this.allTasks = tasks;
        console.log(this.allTasks);
      });
  }
}
