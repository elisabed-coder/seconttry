import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(public http: HttpClient) {}

  getTask(taskId: any) {
    return this.http.get(`http://localhost:4200/posts}`);
  }
}
