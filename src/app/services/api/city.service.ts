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

  private _selectCity: string = '';
  private _selectArea: string = '';
  private _cities: City[] = [];

  constructor(private httpService: HttpService) {}

  set cities(value: City[]) {
    this._cities = value;
  }

  set selectCity(value: string) {
    this._selectCity = value;
  }

  set selectArea(value: string) {
    this._selectArea = value;
  }

  get cityNames(): string[] {
    const names = this._cities.map((city) => city.name);
    return [...new Set(names)];
  }

  get areaNames(): string[] {
    const names = this._cities
      .filter((city) => city.name === this._selectCity)
      .map((city) => city.areaName);
    return [...new Set(names)];
  }

  get areaId(): number | null {
    const area = this._cities
      .filter(
        (city) =>
          city.name === this._selectCity && city.areaName === this._selectArea
      )
      .shift();

    return area ? area.id : null;
  }

  getCity(): Observable<ApiModel<City[]>> {
    return this.httpService.get<City[]>(this.baseUrl);
  }
}
