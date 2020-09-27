import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiModel } from '@models/api-model';
import { City } from '@models/product/product-group-filter';

import { HttpService } from '@services/http.service';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  baseUrl = '/city';

  constructor(private httpService: HttpService) {}

  getCities(): Observable<ApiModel<City[]>> {
    return this.httpService.get<City[]>(this.baseUrl);
  }
}
