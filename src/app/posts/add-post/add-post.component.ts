import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  @Output()
  CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  EmitTaskData: EventEmitter<Task> = new EventEmitter<Task>();

  OnCloseForm() {
    this.CloseForm.emit(false);
  }

  constructor() {}
  ngOnInit(): void {}

  OnFormSubmitted(form: NgForm) {
    this.EmitTaskData.emit(form.value);
    this.OnCloseForm();
  }
}
