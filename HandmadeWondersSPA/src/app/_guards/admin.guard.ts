import { AuthService } from './../_services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate() {
    if (this.authService.isLoggedIn() && this.authService.CurrentUser.role === 'Admin')
      return true;

    if (this.authService.isLoggedIn() && this.authService.CurrentUser.role !== 'Admin') {
      this.router.navigate(['/home']);
      return false;
    }

    this.router.navigate(['/login']);
    return false;

  }

}
