import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {filter, take, tap} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public readonly authService: AuthService, public readonly router: Router) {
  }

  canActivate(): boolean {

    console.log('AuthGuard canActivate');

    if (!this.authService.isAuthenticated()) {

      console.log('AuthGuard canActivate NOT authed');

      if (this.authService.hasRefreshToken()) {

        console.log('AuthGuard canActivate HAS refresh');

        this.authService.refreshToken().pipe(
          filter(success => success === true),
          take(1),
          tap(() => {

            console.log('AuthGuard canActivate FAILED (redirecting)');

          }),
        );

        return true;
      }


      return false;
    }

    return true;
  }
}
