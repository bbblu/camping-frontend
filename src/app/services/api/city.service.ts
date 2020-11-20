import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiModel } from '@models/api-model';
import { City } from '@models/city/city.model';

import { HttpService } from '@services/http.service';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  baseUrl = '/city';

  constructor(private httpService: HttpService) {}

  getCity(): Observable<ApiModel<City[]>> {
    return this.httpService.get<City[]>(this.baseUrl);
  }
}
