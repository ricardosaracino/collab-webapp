import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as decode from 'jwt-decode';
import {BehaviorSubject, of} from 'rxjs';
import {catchError, finalize, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  readonly apiUrl = 'http://localhost:3000';

  public user;


  private isRefreshingToken: boolean = false;

  private tokenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);


  constructor(private http: HttpClient, public readonly router: Router) {
    this.isAuthenticated();
  }

  public setAuthToken(token: string): void {
    localStorage.setItem('auth-token', token);
    this.isAuthenticated();
  }

  public getAuthToken(): string {
    return localStorage.getItem('auth-token');
  }

  public setRefreshToken(token: string): void {
    localStorage.setItem('refresh-token', token);
  }

  public getRefreshToken(): string {
    return localStorage.getItem('refresh-token');
  }

  public hasRefreshToken(): boolean {
    return localStorage.getItem('refresh-token') !== null;
  }

  public isAuthenticated(): boolean {

    if (this.user && Date.now() < this.user.exp * 1000) {
      return true;
    }

    this.user = null;

    const authToken = this.getAuthToken();

    if (authToken) {

      try {
        const decodedToken = decode(authToken);

        if (Date.now() > decodedToken.exp * 1000) {

          this.user = null;

          localStorage.removeItem('auth-token');

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

  /**
   * Redirects to login
   */
  public logout(): boolean {

    // todo delete refresh token on server

    this.user = null;
    localStorage.removeItem('auth-token');
    localStorage.removeItem('refresh-token');
    this.router.navigate(['login']);

    return true;
  }

  public refreshToken(): BehaviorSubject<boolean> {

    const refreshToken = this.getRefreshToken();

    if (!this.isRefreshingToken && refreshToken) {

      this.isRefreshingToken = true;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);

      this.http.post(`${this.apiUrl}/auth/refresh`, {refreshToken})
        .pipe(
          map((resp: { authToken: string }) => {

            this.setAuthToken(resp.authToken);

            return true;
          }),
          tap((success: boolean) => {
            if (success) {

              this.tokenSubject.next(success);

            } else {

              console.error('AuthService refreshToken token refreshed FAILED');

              this.tokenSubject.next(false);

              this.logout();
            }
          }),
          catchError(err => {

            console.error('AuthService refreshToken token refreshed ERROR', err);

            this.tokenSubject.next(false);

            this.logout();

            return of(null)
          }),
          finalize(() => {
            this.isRefreshingToken = false;
          }),
        ).subscribe();
    }

    return this.tokenSubject;
  }
}
