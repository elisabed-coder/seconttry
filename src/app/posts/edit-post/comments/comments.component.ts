import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { commment } from 'src/app/Interfaces/comment.interface';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  allComments: commment[] = [];
  newCommentName: string = '';
  newCommentBody: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const savedComments = localStorage.getItem('comments');
    if (savedComments) {
      this.allComments = JSON.parse(savedComments);
    } else {
      this.getComments();
    }
  }
  private getComments() {
    this.http
      .get<commment[]>('https://jsonplaceholder.typicode.com/posts/1/comments')
      .subscribe((comments) => {
        this.allComments = comments;
        localStorage.setItem('comments', JSON.stringify(this.allComments));
      });
  }

  addNewComment(form: NgForm) {
    const newComment: commment = {
      id: this.allComments.length + 1,
      name: this.newCommentName,
      body: this.newCommentBody,
    };
    this.http
      .post<commment>(
        'https://jsonplaceholder.typicode.com/posts/1/comments',
        newComment
      )
      .subscribe((response) => {
        console.log(response);
        this.allComments = [...this.allComments, response];
        localStorage.setItem('comments', JSON.stringify(this.allComments));
        form.reset();
      });
    this.getComments();
  }
}
