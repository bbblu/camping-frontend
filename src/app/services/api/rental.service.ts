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

  getRentals(): Observable<ApiModel<Rental[]>> {
    return this.httpService.get<Rental[]>(this.baseUrl);
  }

  addRental(data: object): Observable<ApiModel<{ id: number }>> {
    return this.httpService.post<{ id: number }>(this.baseUrl, data);
  }

  getRentalStatus(id: number, status: number): Observable<ApiModel<string>> {
    return this.httpService.get<string>(
      `${this.baseUrl}/${id}/${status}/change-description`
    );
  }

  getBorrows(): Observable<ApiModel<Rental[]>> {
    return this.httpService.get<Rental[]>(`${this.baseUrl}/borrow`);
  }

  cancelRental(id: number, data: object): Observable<ApiModel<string>> {
    return this.httpService.post<string>(`${this.baseUrl}/${id}/cancel`, data);
  }

  agreeCancelRental(id: number): Observable<ApiModel<string>> {
    return this.httpService.patch<string>(
      `${this.baseUrl}/${id}/cancel/agree`,
      {}
    );
  }

  denyCancelRental(id: number, data: object): Observable<ApiModel<string>> {
    return this.httpService.patch<string>(
      `${this.baseUrl}/${id}/cancel/denied`,
      data
    );
  }

  denyRental(id: number, data: object): Observable<ApiModel<string>> {
    return this.httpService.patch<string>(`${this.baseUrl}/${id}/denied`, data);
  }

  payRental(id: number, data: object): Observable<ApiModel<string>> {
    return this.httpService.patch<string>(
      `${this.baseUrl}/${id}/payment`,
      data
    );
  }

  returnRental(id: number, data: object): Observable<ApiModel<string>> {
    return this.httpService.patch<string>(
      `${this.baseUrl}/${id}/returned`,
      data
    );
  }

  claimRental(id: number, data: object): Observable<ApiModel<string>> {
    return this.httpService.patch<string>(`${this.baseUrl}/${id}/claim`, data);
  }

  addRentalComment(id: number, data: object): Observable<ApiModel<string>> {
    return this.httpService.post<string>(
      `${this.baseUrl}/${id}/rental/{id}/comment`,
      data
    );
  }

  updateRentalStatus(id: number): Observable<ApiModel<string>> {
    return this.httpService.patch<string>(
      `${this.baseUrl}/${id}/status/next`,
      {}
    );
  }

  addRentalCheck(id: number, data: object): Observable<ApiModel<string>> {
    return this.httpService.post<string>(`${this.baseUrl}/${id}/check`, data);
  }
}
