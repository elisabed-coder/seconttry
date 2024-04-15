import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/Model/Task';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  @Output() CloseEditPost: EventEmitter<void> = new EventEmitter<void>();
  @Output() UpdatePost: EventEmitter<Task> = new EventEmitter<Task>();

  @Input() selectedTask: Task | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const postId = params.get('id');
      // Now you can use this postId to fetch the post data or perform any other operation
    });
  }

  onCloseEditPost() {
    this.CloseEditPost.emit();
  }

  EditedPost() {
    // Emit the updated post data
    if (this.selectedTask) {
      // Emit the updated post data
      this.UpdatePost.emit(this.selectedTask);
    }
    this.CloseEditPost.emit();
  }
}
