import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { userToShow } from '../_models/users';
import { HttpService } from '../_services/http.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(
    private http: HttpService,
    public authService: AuthService
  ) { }

  users: userToShow[];

  ngOnInit(): void {
    this.getUsersList();
  }

  private getUsersList() {
    this.http.getUsers().subscribe(
      response => this.users = response
    );
  }

  deleteUser(user: userToShow) {
    this.http.deleteUser(user.id).subscribe(
      () => {
        let index = this.users.indexOf(user);
        this.users.splice(index, 1);
      },
      (error) => error("Error: " + error)
    );
  }

}
