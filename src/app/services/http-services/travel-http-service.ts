import { BaseHttpService } from './base-http-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from '../configuration-service';
import { Observable } from 'rxjs';
import Travel from 'src/app/models/travel';
import CreateTravelRequest from 'src/app/models/request-models/create-travel-request';

@Injectable({
  providedIn: 'root'
})
export class TravelHttpService extends BaseHttpService {
  
  constructor(
    httpClien: HttpClient,
    configuration: ConfigurationService
  ) {
    super(httpClien, configuration);
  }

  public createTravel(request: CreateTravelRequest): Observable<Travel> {
    return this.postResource(`travel/create`, request);
  }
}
