import { validatePassword, changePassword } from './../_models/users';
import { userToRegister, userToDelete, userToShow, userToLogin } from '../_models/users';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  baseUrl = environment.apiUrl;

  login(user: userToLogin) {
    return this.http.post(this.baseUrl + "/account/login", user)
      .pipe(
        map(response => {
          let result = response;
          if (result && result['token']) {
            localStorage.setItem('token', result['token']);
            return true;
          }

          return false;

        }
        )
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  registerUser(user: userToRegister) {
    return this.http.post(this.baseUrl + "/account/register", user);
  }

  validatePassword(validatePassword: validatePassword) {
    return this.http.post(this.baseUrl + "/account/validate-password", validatePassword,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('token')
        })
      });
  }

  changePassword(changePasswordDTO: changePassword) {
    return this, this.http.post(this.baseUrl + "/account/change-password", changePasswordDTO,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('token')
        })
      });
  }

  isLoggedIn() {
    let jwtHelper = new JwtHelperService();

    let token = localStorage.getItem('token');

    if (!token) {
      return false;
    }
    let isExpired = jwtHelper.isTokenExpired(token);

    return !isExpired;
  }

  get CurrentUser() {
    let token = localStorage.getItem('token');
    if (!token) return null;

    return new JwtHelperService().decodeToken(token);
  }

}
