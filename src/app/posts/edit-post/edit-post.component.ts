import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  constructor() {}

  ngOnInit(): void {}

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
