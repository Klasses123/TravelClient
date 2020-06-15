import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseHttpService } from './base-http-service';
import SignInResult from 'src/app/models/request-result-models/sign-in-result';
import { ConfigurationService } from '../configuration-service';

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

  public refreshToken(refreshToken: string) {
    return this.getResource(`token/refreshToken/${refreshToken}`);
  }

}
