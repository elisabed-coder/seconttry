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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postservice: PostService
  ) {}

  taskId!: any;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.taskId = params['id'];
    });

    // this.route.data.subscribe((data) => {
    //   this.task = data['task'];
    // });
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
