import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public readonly authService: AuthService, public readonly router: Router) {
  }

  canActivate(): boolean {

    if (!this.authService.isAuthenticated()) {

      if (!this.authService.hasRefreshToken()) {

        this.router.navigate(['login']);

      } else {
        // this will logout and redirect
        this.authService.refreshToken();

        return true;
      }

      return false;
    }

    return true;
  }
}
