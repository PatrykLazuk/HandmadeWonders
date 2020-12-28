import { Router } from '@angular/router';
import { PostService } from './../_services/post.service';

import { postArticle } from './../_models/posts';
import { Component, OnInit } from '@angular/core';
import { CloudinaryUnsigned } from 'puff-puff/CKEditor';
import * as CustomEditor from '../../assets/build/ckeditor';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  post: postArticle;
  public Editor = CustomEditor;

  editorConfig = {
    extraPlugins: [this.imagePluginFactory]
  };

  constructor(
    private postService: PostService,
    private router: Router
  ) {
    this.post = {
      postTitle: '',
      postText: '',
      postThumbinalPhotoUrl: '',
      category: ''
    };
  }

  ngOnInit(): void {

  }
  onSubmit() {

    this.postService.postAPost(this.post)
      .subscribe(
        (success) => this.router.navigate(['/home']),
        (error) => {
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
