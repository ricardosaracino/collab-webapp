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
import {catchError, tap} from 'rxjs/operators';
import {AuthService} from './auth.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.authService.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      });
    }

    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {

        if (event instanceof HttpResponse) {
          //const httpResponse = event as HttpResponse<any>;
        }

        return event;
      }),

      catchError((error: any) => {

        console.error('catch error', error);

        if (error instanceof HttpErrorResponse) {

          if (error.status === 401) {

            console.log('unathed');

            this.authService.isAuthenticated();
          }
        }

        return of(error);
      }),
    );
  }
}
