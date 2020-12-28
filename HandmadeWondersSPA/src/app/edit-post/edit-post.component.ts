import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from './../_services/post.service';

import { postArticle, postModelDTO } from './../_models/posts';
import { Component, OnInit } from '@angular/core';
import { CloudinaryUnsigned } from 'puff-puff/CKEditor';
import * as CustomEditor from '../../assets/build/ckeditor';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  post: postModelDTO;
  public Editor = CustomEditor;

  editorConfig = {
    extraPlugins: [this.imagePluginFactory]
  };

  constructor(
    private postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.post = {
      postId: 0,
      postTitle: '',
      postText: '',
      postThumbinalPhotoUrl: '',
      category: ''
    };
  }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        this.post.postId = +paramMap.get('id');
      }
    );
    this.postService.getPost(this.post.postId).subscribe(
      response => {
        this.post = response;
      }
    );

  }
  onSubmit() {
    this.postService.updatePost(this.post)
      .subscribe(
        () => this.router.navigate(['/posts/' + this.post.postId]),
        (error) => {
          alert("Error: " + error);
          console.log(error);
        }
      );
  };

  imagePluginFactory(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new CloudinaryUnsigned(
        loader,
        'dpqe8znip',
        'ml_default',
        [160, 500]);
    };
  }

}
