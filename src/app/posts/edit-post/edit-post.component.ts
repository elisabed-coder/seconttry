import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/Model/Task';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  @Output() CloseEditPost: EventEmitter<void> = new EventEmitter<void>();

  @Input() selectedTask: Task | null = null;

  constructor() {}

  ngOnInit(): void {}

  onCloseEditPost() {
    this.CloseEditPost.emit();
  }
}
