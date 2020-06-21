import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription, BehaviorSubject } from 'rxjs';
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

  constructor(
    private authHttpService: AuthHttpService
  ) { }

  public get isLoggedIn(): boolean {
    return localStorage.getItem(this.nameofTokenKey) !== null;
  }
  loggedInSource = new BehaviorSubject<boolean>(this.isLoggedIn);
  loggedIn: Observable<boolean> = this.loggedInSource.asObservable();
  changeLoggedInState(res: boolean) {
    this.loggedInSource.next(res);
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

  public resetToken(tokenResponse: RefreshTokenResponse): void {
    localStorage.setItem(this.nameofRefreshToken, tokenResponse.refreshToken);
    localStorage.setItem(this.nameofTokenKey, tokenResponse.token);
  }

  public refreshToken(): Observable<RefreshTokenResponse> {
    return this.authHttpService.refreshToken(localStorage.getItem(this.nameofRefreshToken));
  }

  public login(
    userName: string,
    password: string
  ): Subscription {
    return this.authHttpService.login(userName, password).subscribe(
      (resp: SignInResult) => {
        localStorage.setItem(this.nameofLogin, resp.user.login);
        if (resp.user.company) {
          localStorage.setItem(this.nameofCompanyId, resp.user.company.id);
        }
        localStorage.setItem(this.nameofTokenKey, resp.token);
        localStorage.setItem(this.nameofRefreshToken, resp.refreshToken);
        this.loginResult$.next(resp);
        this.changeLoggedInState(true);
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
    this.changeLoggedInState(false);
  }
}
