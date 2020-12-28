import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { routes } from '../routes';
import { Router } from '@angular/router';
import { userToLogin, userToShow } from '../_models/users';
import { HttpService } from '../_services/http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private http: HttpService,
    private auth: AuthService,
    private router: Router
  ) { }

  user: userToLogin;
  invalidLogin = false;

  form = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  }

  get userName() {
    return this.form.get('userName');
  }

  get password() {
    return this.form.get('password');
  }

  login() {
    this.user = {
      username: this.userName.value,
      password: this.password.value
    }

    this.auth.login(this.user)
      .subscribe(
        success => {
          this.router.navigate(['/home']);

        },
        error => {
          if (error.status === 401) {
            this.invalidLogin = true;
          }
          else {
            alert(error);
          }
        }
      )
  }

  goBack() {
    this.router.navigate(['/home']);
  }

}
