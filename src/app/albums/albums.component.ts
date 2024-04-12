import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { albums } from '../Interfaces/albums.interface';
import { User } from '../Model/Task';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit {
  allAlbums: albums[] = [];
  allUsers: User[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAlbumsTitle();
    this.getUsers();
  }

  getAlbumsTitle() {
    this.http
      .get<albums[]>('https://jsonplaceholder.typicode.com/albums')
      .subscribe((response) => {
        this.allAlbums = response;
      });
  }

  getUsers() {
    this.http
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe((response) => {
        this.allUsers = response;
      });
  }
  getUserById(userId: number): User | undefined {
    return this.allUsers.find((user) => user.id === userId);
  }
}
