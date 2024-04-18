import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  posts: any[] = [];
  users: any[] = [];
  private userIdCounter: number = 0;
  private postIdCounter: number = 0;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    if (this.users.length !== 0) {
      return new Observable<any[]>((observer) => {
        observer.next(this.users);
        observer.complete();
      });
    } else {
      return this.http
        .get<any[]>('https://jsonplaceholder.typicode.com/Users')
        .pipe(
          map((users) => {
            this.users = users;
            this.userIdCounter = users.length;
            return users;
          })
        );
    }
  }

  getPosts(): Observable<any[]> {
    if (this.posts.length !== 0) {
      return new Observable<any[]>((observer) => {
        observer.next(this.posts);
        observer.complete();
      });
    } else {
      return this.http
        .get<any[]>('https://jsonplaceholder.typicode.com/posts')
        .pipe(
          map((posts) => {
            this.posts = posts;
            this.postIdCounter = posts.length;
            return posts;
          })
        );
    }
  }

  addUser(user: any): Observable<any> {
    user.id = ++this.userIdCounter;
    return this.http
      .post<any>('https://jsonplaceholder.typicode.com/users', user)
      .pipe(
        map((addedUser) => {
          addedUser.id = user.id;
          this.users.push(addedUser);
          return addedUser;
        })
      );
  }

  addPost(post: any): Observable<any> {
    post.id = ++this.postIdCounter;
    return this.http
      .post<any>('https://jsonplaceholder.typicode.com/posts', post)
      .pipe(
        map((addedPost) => {
          addedPost.id = post.id;
          this.posts.unshift(addedPost);
          return addedPost;
        })
      );
  }

  getPostById(id: number): Observable<any> {
    const foundPost = this.posts?.find((p) => p.id === id);
    if (foundPost) {
      return new Observable<any>((observer) => {
        observer.next(foundPost);
        observer.complete();
      });
    } else {
      return this.http.get<any>(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
    }
  }

  updatePost(post: any): Observable<any> {
    if (post.id > 100) {
      return new Observable<any>((observer) => {
        observer.next(post);
        observer.complete();
      });
    } else {
      return this.http.put<any>(
        `https://jsonplaceholder.typicode.com/posts/${post.id}`,
        post
      );
    }
  }
}
