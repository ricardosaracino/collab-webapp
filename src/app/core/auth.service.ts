import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public user;

  constructor(public readonly router: Router) {
    this.isAuthenticated();
  }

  public setAccessToken(token: string): void {
    localStorage.setItem('access-token', token);
    this.isAuthenticated();
  }

  public getAccessToken(): string {
    return localStorage.getItem('access-token');
  }

  public setRefreshToken(token: string): void {
    localStorage.setItem('refresh-token', token);
  }

  public getRefreshToken(): string {
    return localStorage.getItem('refresh-token');
  }

  public logout(): void {

    // todo delete refresh token on server

    this.user = null;
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
    this.router.navigate(['login']);
  }


  public isAuthenticated(): boolean {

    if (this.user && Date.now() < this.user.exp * 1000) {
      return true;
    }

    this.user = null;

    const token = this.getAccessToken();

    console.log('isAuthenticated', token);

    if (token) {

      try {
        const decodedToken = decode(token);

        console.log('isAuthenticated', decodedToken);

        if (Date.now() > decodedToken.exp * 1000) {

          this.user = null;

          localStorage.removeItem('access-token');

          return false;
        }

        this.user = decodedToken;

        return true;

      } catch (e) {
        console.error(e);
        return false;
      }
    }

    return false;
  }
}
