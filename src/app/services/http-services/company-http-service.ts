import { BaseHttpService } from './base-http-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from '../configuration-service';
import { Observable } from 'rxjs';
import Company from 'src/app/models/company';
import CreateCompanyRequest from 'src/app/models/request-models/create-company-request';

@Injectable({
  providedIn: 'root'
})
export class CompanyHttpService extends BaseHttpService {
  
  constructor(
    httpClien: HttpClient,
    configuration: ConfigurationService
  ) {
    super(httpClien, configuration);
  }

  public createCompany(request: CreateCompanyRequest): Observable<Company> {
    return this.postResource<Company>(`company/create`, request);
  }

  public getCompany(name: string): Observable<Company> {
    return this.getResource<Company>(`company/getByName/${name}`);
  }

  public deleteCompany(name: string): Observable<boolean> {
    return this.deleteResource<boolean>(`company/delete/${name}`);
  }
}
