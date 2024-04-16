import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../Model/Task';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  showCreateTaskForm: boolean = false;
  showEditPost: boolean = false;
  selectedTask: Task | null = null;

  // http: HttpClient = inject(HttpClient);
  allTasks: Task[] = [];

  OpenCreateTaskForm() {
    this.showCreateTaskForm = true;
  }

  CloseCreateTaskForm() {
    this.showCreateTaskForm = false;
  }

  constructor(private http: HttpClient, private router: Router) {}

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

  // private getUsername(userId: number) {
  //   this.http
  //     .get('https://jsonplaceholder.typicode.com/users/' + userId)
  //     .subscribe((user: any) => {
  //       // Assuming user's ID matches task's user ID
  //       const userTasks = this.allTasks.filter(
  //         (task) => task.userId === userId
  //       );
  //       const userTaskTitles = userTasks.map((task) => task.title);
  //       console.log('User:', user.name);
  //       console.log('Task Titles:', userTaskTitles);
  //     });
  // }

  // private fetchAllTasks() {
  //   this.http
  //     .get<{ [key: string]: Task }>(
  //       'https://jsonplaceholder.typicode.com/posts'
  //     )
  //     .pipe(
  //       map((response) => {
  //         // Transfrom data
  //         let tasks = [];

  //         for (let key in response) {
  //           if (response.hasOwnProperty(key)) {
  //             tasks.push({ ...response[key], id: key });
  //           }
  //         }
  //         return tasks;
  //       })
  //     )
  //     .subscribe((tasks) => {
  //       this.allTasks = tasks;
  //       console.log(this.allTasks);
  //     });
  // }
  private fetchAllTasks() {
    // Fetching users and tasks simultaneously
    const usersRequest = this.http.get<any[]>(
      'https://jsonplaceholder.typicode.com/users'
    );
    const tasksRequest = this.http.get<Task[]>(
      'https://jsonplaceholder.typicode.com/posts'
    );

    // Combining both requests using forkJoin
    forkJoin([usersRequest, tasksRequest]).subscribe(([users, tasks]) => {
      // Mapping user objects to user ID
      const usersMap = users.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {});

      // Matching users with tasks based on user ID
      this.allTasks = tasks.map((task) => {
        return {
          ...task,
          user: usersMap[task.userId], // Assigning user object to task
        };
      });

      console.log(this.allTasks);
    });
  }

  CreateTask(data: Task) {
    this.allTasks = [data, ...this.allTasks];
    console.log(this.allTasks);
  }

  openEditPost(task: Task) {
    this.showEditPost = true;
    this.selectedTask = task;
    // this.router.navigate(['/posts', this.selectedTask.id]); // Corrected syntax
  }

  CloseEditPost() {
    this.showEditPost = false;
    this.selectedTask = null;
  }

  UpdatePost(updatedPost: Task) {
    console.log(updatedPost);
    // Find the index of the updated post
    const index = this.allTasks.findIndex((task) => task.id === updatedPost.id);

    if (index !== -1) {
      // Update the post in the array
      this.allTasks[index] = updatedPost;
    }
  }
}
