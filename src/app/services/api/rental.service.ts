import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiModel } from '@models/api-model';
import { Rental } from '@models/rental/rental';

import { HttpService } from '@services/http.service';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  baseUrl = '/rental';

  constructor(private httpService: HttpService) {}

  getRentals(): Observable<ApiModel<Rental>> {
    return this.httpService.get<Rental>(this.baseUrl);
  }

  addRental(data: object): Observable<ApiModel<{ id: string }>> {
    return this.httpService.post<{ id: string }>(this.baseUrl, data);
  }

  getBorrows(): Observable<ApiModel<Rental>> {
    return this.httpService.get<Rental>(`${this.baseUrl}/borrow`);
  }

  updateRentalStatus(id: number): Observable<ApiModel<string>> {
    return this.httpService.patch<string>(
      `${this.baseUrl}/${id}/status/next`,
      {}
    );
  }
}
