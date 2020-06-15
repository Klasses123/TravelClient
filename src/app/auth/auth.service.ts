import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs';
import SignInResult from '../models/response-models/sign-in-result';
import { AuthHttpService } from '../services/http-services/auth-http-service';
import RefreshTokenResponse from '../models/response-models/refresh-token-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly nameofTokenKey: string = 'auth_token';
  private readonly nameofLogin: string = 'login';
  private readonly nameofCompanyId: string = 'company_id';
  private readonly nameofRefreshToken: string = 'refresh_token';
  public redirectUrl: string;
  public loginResult$: Subject<SignInResult> = new Subject<SignInResult>();
  public errorMessage: string;

  public get isLoggedIn(): boolean {
    return localStorage.getItem(this.nameofTokenKey) !== null;
  }

  public getAuthToken(): string {
    return localStorage.getItem(this.nameofTokenKey);
  }

  public getRefreshToken(): string {
    return localStorage.getItem(this.nameofRefreshToken);
  }

  public getUserName(): string {
    return localStorage.getItem(this.nameofLogin);
  }

  constructor(private authHttpService: AuthHttpService) {}

  public refreshToken(): Subscription {
    return this.authHttpService.refreshToken(localStorage.getItem(this.nameofRefreshToken)).subscribe(
      (resp: RefreshTokenResponse) => {
        localStorage.setItem(this.nameofTokenKey, resp.token);
        localStorage.setItem(this.nameofRefreshToken, resp.refreshToken);
      },
      (e) => {
        this.errorMessage = e;
      }
    );
  }

  public login(
    userName: string,
    password: string
  ): Subscription {
    return this.authHttpService.login(userName, password).subscribe(
      (resp: SignInResult) => {
        localStorage.setItem(this.nameofLogin, resp.user.userName);
        localStorage.setItem(this.nameofCompanyId, resp.user.company.id);
        localStorage.setItem(this.nameofTokenKey, resp.token);
        localStorage.setItem(this.nameofRefreshToken, resp.refreshToken);
        this.loginResult$.next(resp);
      },
      (e) => {
        this.errorMessage = e;
        this.loginResult$.next();
      }
    );
  }

  public logout(): void {
    localStorage.removeItem(this.nameofTokenKey);
    localStorage.removeItem(this.nameofLogin);
    localStorage.removeItem(this.nameofRefreshToken);
    localStorage.removeItem(this.nameofCompanyId);
    this.loginResult$.next({});
  }
}
