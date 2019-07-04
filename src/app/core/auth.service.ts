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

  public setToken(token: string): void {
    localStorage.setItem('token', token);

    this.isAuthenticated();
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public logout(): void {
    this.user = null;
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }


  public isAuthenticated(): boolean {

    if (this.user && Date.now() < this.user.exp * 1000) {
      return true;
    }

    this.user = null;

    const token = this.getToken();

    console.log('isAuthenticated', token);

    if (token) {

      try {
        const decodedToken = decode(token);

        console.log('isAuthenticated', decodedToken);

        if (Date.now() > decodedToken.exp * 1000) {

          this.user = null;

          localStorage.removeItem('token');

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
