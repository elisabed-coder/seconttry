import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  OnChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/Model/Task';
import { PostService } from 'src/app/Services/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  @Output() CloseEditPost: EventEmitter<void> = new EventEmitter<void>();
  @Output() UpdatePost: EventEmitter<Task> = new EventEmitter<Task>();
  @Input() selectedTask!: Task | null;
  @ViewChild('loadingTemplate', { static: true })
  loadingTemplate!: TemplateRef<any>;

  // @Input() selectedTask: Task | null = null;
  task: Task | null = null;
  taskId!: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postservice: PostService
  ) {}

  ngOnInit(): void {
    // const id = this.route.snapshot.paramMap.get('id');
    // if (id !== null) {
    //   this.taskId = +id;
    //   // If selectedTask is not null and matches the taskId, assign it to task
    //   if (this.selectedTask && this.selectedTask.id === this.taskId) {
    //     this.task = this.selectedTask;
    //   } else {
    //     console.error(`Task with ID ${this.taskId} not found in selectedTask.`);
    //   }
    // } else {
    //   console.error('ID parameter is null.');
    // }
    // console.log(this.task);
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
