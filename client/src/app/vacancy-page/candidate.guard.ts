import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) { }
  canActivate(): boolean {
    if ((!sessionStorage.getItem("rememberSession") && localStorage.getItem("remember") === 'false') || !this._authService.isAuthenticated()) {
      this._authService.logout();
      this._router.navigate(['/auth']);
      return false;
    }
    else {
      return true;
    }
  }

}