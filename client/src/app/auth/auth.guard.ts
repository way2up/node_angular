import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdmin implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) { }
  canActivate(): boolean {
    if (this._authService.isAuthenticatedAdmin()) {
      return true;
    } else { 
      this._router.navigate(['/auth']);
      return false;
    }
  }

}
