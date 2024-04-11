import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/Model/Task';

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
    const newTask: Task = {
      userId: 0, // Set to a default value or update as needed
      user: { id: 0, name: form.value.name }, // Assuming name corresponds to user's name
      title: form.value.title,
      body: form.value.body,
      id: this.generateUniqueId(), // Set to undefined since it will be generated automatically
    };
    this.EmitTaskData.emit(newTask);
    this.OnCloseForm();
  }
  private generateUniqueId(): number {
    // Generate a unique ID based on the current timestamp
    return Date.now();
  }
}
