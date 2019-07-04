import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public readonly auth: AuthService, public readonly router: Router) {
  }

  canActivate(): boolean {

    console.log('canActivate');

    if (!this.auth.isAuthenticated()) {

      this.router.navigate(['login']);

      return false;
    }

    return true;
  }
}
