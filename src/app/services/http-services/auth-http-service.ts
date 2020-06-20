import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseHttpService } from './base-http-service';
import SignInResult from 'src/app/models/response-models/sign-in-result';
import { ConfigurationService } from '../configuration-service';
import RefreshTokenResponse from 'src/app/models/response-models/refresh-token-response';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService extends BaseHttpService {
  constructor(
    httpClient: HttpClient,
    configuration: ConfigurationService
  ) {
    super(httpClient, configuration);
  }

  public login(
    userName: string,
    password: string
  ): Observable<SignInResult> {
    return this.postResource('token/login', {
      userName,
      password
    });
  }

  public refreshToken(refreshToken: string): Observable<RefreshTokenResponse> {
    return this.getResource(`token/refreshToken/${refreshToken}`);
  }

}
