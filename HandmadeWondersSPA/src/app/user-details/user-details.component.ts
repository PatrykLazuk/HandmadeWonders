import { userToShow } from '../_models/users';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../_services/http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  id: number;
  user: userToShow;
  form: FormGroup;
  name: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpService
  ) {

    this.form = new FormGroup({
      userName: new FormControl('', Validators.required)
    });

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        this.id = +paramMap.get('id');
      }
    );

    this.http.getUser(this.id).subscribe(
      (response) => {
        this.user = response;
        this.fillInputs();
      }
    );

  }

  fillInputs() {
    this.form.controls.userName.setValue(this.user.userName);
  }

  goBack() {
    this.router.navigate(['/users']);
  }

  saveChanges() {
    this.user = {
      id: this.id,
      userName: this.userName.value,
    }

    this.http.editUser(this.user).subscribe
      (
        () => this.router.navigate(['/users']),
        (error) => {
          alert("Error: " + error);
          console.log(error);
        }
      );
  }

  get userName() {
    return this.form.get('userName');
  }


}
