import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  readonly maxAccessFailedCount: number = 5;
  readonly defaultToastDelay: number = 3 * 1000;
  readonly disappearToastTransition: number = 1000;
  readonly appearanceToastTransition: number = 300;

  readonly webApiUrl: string = 'https://localhost:44315/api';

}