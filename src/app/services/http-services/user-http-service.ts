import { Injectable } from '@angular/core';
import User from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from './base-http-service';
import { Observable } from 'rxjs';
import { ConfigurationService } from '../configuration-service';
import RegisterUserResponse from 'src/app/models/response-models/register-user-response';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService extends BaseHttpService {
  constructor(
    httpClient: HttpClient,
    configuration: ConfigurationService
  ) {
    super(httpClient, configuration);
  }

  public createUser(user: User): Observable<RegisterUserResponse> {
    return this.postResource<RegisterUserResponse>('user/create', user);
  }

  public getUserById(id: string): Observable<User> {
    return this.getResource<User>(`user/${id}`);
  }

  public getUserByIdIncludeCompany(id: string): Observable<User> {
    return this.getResource<User>(`user/${id}/withCompany`);
  }

  public getUserByUserName(userName: string): Observable<User> {
    return this.getResource<User>(`user/getByUserName/${userName}`);
  }
}
