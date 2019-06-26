import {Injectable} from '@angular/core';
import * as decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public user;

  constructor() {

    const token = localStorage.getItem('token');

    if (token) {
      this.user = decode(token);
    }
  }

  public setToken(token) {
    localStorage.setItem('token', token);
    this.user = decode(token);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting
    // whether or not the token is expired
    return true;//okenNotExpired(token);
  }
}
