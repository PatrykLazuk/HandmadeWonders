import { postArticle, postModelDTO, postPicture } from './../_models/posts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { postModel } from '../_models/posts';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getPost(id: number): Observable<postModelDTO> {

    return this.http.get<postModelDTO>(this.baseUrl + "/posts/" + id,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('token')
        })
      });
  }

  getPostThumbinals(): Observable<postModel[]> {
    return this.http.get<postModel[]>(this.baseUrl + '/posts');
  }

  getPostPictures(): Observable<postPicture[]> {
    return this.http.get<postPicture[]>(this.baseUrl + "/posts/pictures");
  }

  postAPost(postArticle: postArticle) {
    return this.http.post(this.baseUrl + "/posts/create-post", postArticle,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('token')
        })
      });
  }

  updatePost(postForUpdate: postModelDTO) {
    return this.http.put(this.baseUrl + '/posts/update-post', postForUpdate,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('token')
        })
      });
  }

  deletePost(id: number) {
    return this.http.delete(this.baseUrl + "/posts/" + id,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('token')
        })
      });
  }

}
