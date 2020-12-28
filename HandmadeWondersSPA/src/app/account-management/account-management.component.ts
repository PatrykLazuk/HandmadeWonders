import { Router } from '@angular/router';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit {

  form: FormGroup;
  oldPasswordValid: boolean = true;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log(this.authService.CurrentUser);
  }

  isOldPasswordCorrect() {
    this.authService.validatePassword({ id: +this.authService.CurrentUser.nameid, passwordToValidate: this.oldPassword.value }).subscribe(
      (response) => {
        if (response === true) {
          this.oldPasswordValid = true;
        }
        else {
          this.oldPasswordValid = false;
        }
      }
    );
  }

  changePassword() {
    this.isOldPasswordCorrect();
    if (this.oldPasswordValid) {
      console.log('Password can be changed');

      this.authService.changePassword({ id: +this.authService.CurrentUser.nameid, OldPassword: this.oldPassword.value, NewPassword: this.newPassword.value })
        .subscribe(
          (response) => {
            this.authService.logout();
            this.router.navigate(['/login']);
          },
          (error) => {
            alert(error);
          }
        );
    }
    else {
      alert('Password cannot be changed');
    }
  }

  get oldPassword() {
    return this.form.get('oldPassword');
  }

  get newPassword() {
    return this.form.get('newPassword');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

}
