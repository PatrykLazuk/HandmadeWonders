import { userToRegister, userToDelete, userToShow, userToLogin } from '../_models/users';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }
  getUsers(): Observable<userToShow[]> {
    return this.http.get<userToShow[]>(this.baseUrl + "/users",
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('token')
        })
      });
  }

  getUser(id: number): Observable<userToShow> {
    return this.http.get<userToShow>(this.baseUrl + "/users/" + id
      ,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('token')
        })
      });
  }
  editUser(user: userToShow) {
    return this.http.put(this.baseUrl + "/users", user,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('token')
        })
      });
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + "/users/" + id,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('token')
        })
      });
  }
}
