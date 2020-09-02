import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiModel } from '../models/api-model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private serverIp = environment.serverIp;
  private httpOptions = {
    headers: new HttpHeaders({
      'X-Auth-Token': '',
      'Content-Type': 'application/json',
    })
  };

  constructor(
    private http: HttpClient
  ) {
  }

  getData<T>(url: string): Observable<ApiModel<T>> {
    return this.http.get<ApiModel<T>>(this.serverIp + url, this.httpOptions);
  }

  postData<T>(url: string, data: object): Observable<ApiModel<T>> {
    return this.http.post<ApiModel<T>>(this.serverIp + url, data, this.httpOptions);
  }

}
