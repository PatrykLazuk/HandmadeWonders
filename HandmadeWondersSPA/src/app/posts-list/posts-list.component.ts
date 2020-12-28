import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../_services/auth.service';
import { PostService } from './../_services/post.service';
import { postModel } from '../_models/posts';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  constructor(
    private postService: PostService,
    public authService: AuthService,
    private activRoute: ActivatedRoute
  ) { }

  posts: postModel[] = [];
  category: string;

  getPostsCategory() {
    this.activRoute.paramMap.subscribe(
      paramMap => {
        this.category = paramMap.get('category');
      }
    );

  }


  ngOnInit(): void {
    this.getPostsCategory();
    this.getPostThumbinals();
  }

  getPostThumbinals() {

    return this.postService.getPostThumbinals().subscribe(
      response => {
        response.forEach(post => {
          let start = post.postText.indexOf("<p>");

          if (start !== -1) {
            start = start + 3;
            let end = post.postText.indexOf("</p>");
            let thumbinalText = post.postText.substring(start, end);
            post.postText = thumbinalText;
          }

          this.pushPostToView(this.category, post.category, post);
        });
      }

    )

  }

  pushPostToView(choosenCategory: string, postCategory: string, post: postModel) {
    if (choosenCategory === 'all')
      this.posts.push(post);
    else if (choosenCategory === postCategory) {
      this.posts.push(post);
    }
  }

  deletePost(post: postModel) {
    this.postService.deletePost(post.postId).subscribe(
      () => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      },
      (error) => error("Error: ", error)
    );
  }


}
