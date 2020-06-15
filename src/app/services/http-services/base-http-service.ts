import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from '../configuration-service';
import { Observable } from 'rxjs/internal/Observable';

export abstract class BaseHttpService {
  private readonly webApiUrl: string = this.configuration.webApiUrl;

  constructor(
    private httpClient: HttpClient,
    protected configuration: ConfigurationService   
  ) {}

  protected getResource<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(`${this.webApiUrl}/${url}`);
  }

  protected postResource<T>(url: string, body: object): Observable<T> {
    return this.httpClient.post<T>(`${this.webApiUrl}/${url}`, body);
  }

  protected putResource<T>(url: string, object: object): Observable<T> {
    return this.httpClient.put<T>(`${this.webApiUrl}/${url}`, object);
  }

  protected deleteResource<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(`${this.webApiUrl}/${url}`);
  }
}