import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SecretGamesAuthGuard implements CanActivate {
  constructor(private _auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (!this._auth.isAuthenticated()) {
      this.router.navigate(['/secret-message/create']);
      return false;
    }
    return true;
  }
}
