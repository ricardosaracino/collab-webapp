import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import {AuthService} from './auth.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public authService: AuthService) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.info(`TokenInterceptor Request to ${request.url}`);

    if (request.url.includes('/auth/refresh')) {
      return next.handle(request);
    }

    console.info(`TokenInterceptor Adding request token to ${request.url}`);

    return next.handle(this.addTokenToRequest(request)).pipe(tap((event: HttpEvent<any>) => {

        if (event instanceof HttpResponse) {
          //const httpResponse = event as HttpResponse<any>;
        }

        return event;
      }),

      catchError((error: any) => {

        if (error instanceof HttpErrorResponse) {

          if (error.status === 401) {

            return this.handleUnauthorized(request, next);
          }
        }

        return of(error);
      }),
    );
  }

  private addTokenToRequest(request: HttpRequest<any>): HttpRequest<any> {

    const token = this.authService.getAuthToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getAuthToken()}`,
        },
      });
    }

    return request;
  }

  private handleUnauthorized(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.authService.refreshToken().pipe(
      filter(success => success === true),
      take(1),
      switchMap(() => {
        return next.handle(this.addTokenToRequest(request));
      }),
    );
  }
}



