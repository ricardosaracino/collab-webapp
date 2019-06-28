import {Injectable} from '@angular/core';
import * as decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public user;

  constructor() {
    this.isAuthenticated();
  }

  public setToken(token: string) {
    localStorage.setItem('token', token);

    this.isAuthenticated();
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {

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

      } catch (e) {
        console.error(e);
        return false;
      }
    }

    return true;
  }
}
