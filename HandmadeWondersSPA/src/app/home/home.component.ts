import { PostService } from './../_services/post.service';
import { Component, OnInit } from '@angular/core';
import { postPicture } from '../_models/posts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  postPictures: postPicture[];

  constructor(
    private postService: PostService
  ) {
  }
  ngOnInit(): void {
    //console.log(localStorage.getItem('token'));
    this.postService.getPostPictures().subscribe(
      (response) => {
        this.postPictures = response;
      }
    )
  }

}
