import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import * as CustomEditor from '../../assets/build/ckeditor';
import { CloudinaryUnsigned } from 'puff-puff/CKEditor';
import { postModelDTO } from './../_models/posts';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../_services/post.service';

@Component({
  selector: 'post-thumbinal',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post: postModelDTO;
  public Editor = CustomEditor;

  editorConfig = {
    toolbar: [],
    extraPlugins: [this.imagePluginFactory]
  };

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService
  ) {
    this.post = {
      postId: 0,
      postTitle: '',
      postText: '',
      postThumbinalPhotoUrl: '',
      category: ''
    };

  }

  ngOnInit() {
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
