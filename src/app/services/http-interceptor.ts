import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
  } from '@angular/common/http';
  import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
  import { catchError, switchMap, filter, take } from 'rxjs/operators';
  import { ToastService } from '../components/shared/toast/toast.service';
  import { Injectable } from '@angular/core';
  import { ToastData } from '../components/shared/toast/toast-config';
import { UserHttpService } from './http-services/user-http-service';
import { AuthService } from '../auth/auth.service';
import RefreshTokenResponse from '../models/response-models/refresh-token-response';
  
  @Injectable({ providedIn: 'root' })
  export class HttpIntercept implements HttpInterceptor {
    constructor(
      public toastService: ToastService,
      public authService: AuthService,
      public userService: UserHttpService
    ) {}
    toast: ToastData = {
      text: 'server error',
      backgroundColor: '#e3242b',
      margin: 20
    };
  
    refreshTokenInProgress: boolean = false;
    private refreshTokenSubject: Subject<string> = new BehaviorSubject<string>(
      null
    );
  
    private get headers(): {
      [name: string]: string | string[];
      } {
      if (this.authService.isLoggedIn)
        return { Authorization: `Bearer ${this.authService.getAuthToken()}` };
      return {};
    }
  
    intercept(
      request: HttpRequest<object>,
      next: HttpHandler
    ): Observable<HttpEvent<object>> {
      request = request.clone({
        setHeaders: this.headers
      });
      return next.handle(request).pipe(
        catchError((errorResponse) => {
          console.log(errorResponse);
          
          if (errorResponse.status >= 500) {
            if (errorResponse.console.error.Details.Text) {
              this.toast.text = errorResponse.error.Details.Text;
              this.toastService.show(this.toast);
              return throwError(errorResponse.error.Details.Text);
            }
            return throwError('Неопределенная ошибка сервера!');
          }

          if (errorResponse.status === 0) {
            this.toast.text = 'Ошибка соединения с сервером!';
            this.toastService.show(this.toast);
            return throwError('Нет соединения с сервером');
          }

          if (errorResponse.status === 401) {
            if (!this.refreshTokenInProgress) {
              this.refreshTokenInProgress = true;
              this.refreshTokenSubject.next(null);
              return this.authService
                .refreshToken()
                .pipe(
                  switchMap((refreshTokenResponse: RefreshTokenResponse) => {
                    this.authService.resetToken(refreshTokenResponse);
                    this.refreshTokenInProgress = false;
                    this.refreshTokenSubject.next(refreshTokenResponse.token);
                    return next.handle(this.injectToken(request));
                  })
                );
            } else {
              return this.refreshTokenSubject.pipe(
                filter((result) => result !== null),
                take(1),
                switchMap(() => 
                  next.handle(this.injectToken(request))
                )
              );
            }
          }

          return throwError(errorResponse.error.Details.Text);
        })
      );
    }
  
    injectToken(request: HttpRequest<object>): HttpRequest<object> {
      const token = this.authService.getAuthToken();
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  }