import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { albumsDetails } from 'src/app/Interfaces/albumsDetails.interface';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss'],
})
export class AlbumDetailsComponent implements OnInit {
  allAlbumDetails: albumsDetails[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getalbums();
  }

  getalbums() {
    this.http
      .get<albumsDetails[]>(
        'https://jsonplaceholder.typicode.com/albums/1/photos'
      )
      .subscribe((response) => {
        this.allAlbumDetails = response;
      });
  }
}
