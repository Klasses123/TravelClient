import { Injectable } from '@angular/core';
import User from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from './base-http-service';
import { Observable } from 'rxjs';
import SignInResult from 'src/app/models/response-models/sign-in-result';
import { ConfigurationService } from '../configuration-service';

export interface IUserApi {
  createUser(user: User): Observable<User>;
}

@Injectable({
  providedIn: 'root'
})
export class UserHttpService extends BaseHttpService implements IUserApi {
  constructor(
    httpClient: HttpClient,
    configuration: ConfigurationService
  ) {
    super(httpClient, configuration);
  }

  public createUser(user: User): Observable<User> {
    return this.postResource<User>('user', user);
  }

  public getUserById(id: string): Observable<User> {
    return this.getResource<User>(`user/${id}`);
  }

  public getUserByIdIncludeCompany(id: string): Observable<User> {
    return this.getResource<User>(`user/${id}/withCompany`);
  }

  //TODO: переделать
  public refreshToken(refreshToken: string): Observable<SignInResult> {
    return this.getResource<SignInResult>(`user/refreshToken/${refreshToken}`);
  }
}
