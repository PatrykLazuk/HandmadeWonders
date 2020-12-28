import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userToRegister } from '../_models/users';
import { HttpService } from '../_services/http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private http: HttpService,
    private auth: AuthService,
    private router: Router
  ) { }

  form = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)])
  });

  get userName() {
    return this.form.get('userName');
  }

  get password() {
    return this.form.get('password');
  }

  ngOnInit(): void {
  }

  user: userToRegister;

  register() {

    this.user = {
      username: this.userName.value,
      password: this.password.value
    }

    this.auth.registerUser(this.user)
      .subscribe(
        (success) => this.router.navigate(['/home']),
        (error) => {
          if (error.status === 400) {
            alert("Username already exists");
          }
          else {
            alert("Error: " + error);
          }
          this.userName.setValue('');
          this.password.setValue('');

          this.form.reset();

        }

      );
  }

  goBack() {
    this.router.navigate(['/home']);
  }

}
