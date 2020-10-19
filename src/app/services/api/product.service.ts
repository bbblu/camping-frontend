import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiModel } from '@models/api-model';
import { ProductGroup } from '@models/product/product-group.model';
import { ProductGroup as ProductGroupDetail } from '@models/product/product-group-detail.model';
import {
  ProductGroupFilter,
  ProductType,
} from '@models/product/product-group-filter.model';

import { HttpService } from '@services/http.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl = '/product-group';

  constructor(private httpService: HttpService) {}

  getProductGroups(params: string): Observable<ApiModel<ProductGroup[]>> {
    return this.httpService.get<ProductGroup[]>(`${this.baseUrl}?${params}`);
  }

  addProductGroups(data: object): Observable<ApiModel<string>> {
    return this.httpService.post<string>(this.baseUrl, data);
  }

  getProductGroup(id: number): Observable<ApiModel<ProductGroupDetail>> {
    return this.httpService.get<ProductGroupDetail>(`${this.baseUrl}/${id}`);
  }

  updateProductGroup(id: number, data: object): Observable<ApiModel<string>> {
    return this.httpService.patch<string>(`${this.baseUrl}/${id}`, data);
  }

  deleteProductGroup(id: number): Observable<ApiModel<string>> {
    return this.httpService.delete<string>(`${this.baseUrl}/${id}`);
  }

  updateProducts(
    groupId: number,
    data: object
  ): Observable<ApiModel<ProductGroupDetail>> {
    return this.httpService.patch<ProductGroupDetail>(
      `${this.baseUrl}/${groupId}/product`,
      data
    );
  }

  updateProduct(
    groupId: number,
    productId: number,
    data: object
  ): Observable<ApiModel<ProductGroupDetail>> {
    return this.httpService.patch<ProductGroupDetail>(
      `${this.baseUrl}/${groupId}/product/${productId}`,
      data
    );
  }

  deleteProduct(productId: number): Observable<ApiModel<string>> {
    return this.httpService.delete<string>(
      `${this.baseUrl}/product/${productId}`
    );
  }

  deleteProductImage(imageId: number): Observable<ApiModel<string>> {
    return this.httpService.delete<string>(
      `${this.baseUrl}/product/image/${imageId}`
    );
  }

  getProductTypes(): Observable<ApiModel<ProductType[]>> {
    return this.httpService.get<ProductType[]>(`${this.baseUrl}/product/type`);
  }

  getProductFilter(): Observable<ApiModel<ProductGroupFilter>> {
    return this.httpService.get<ProductGroupFilter>(`${this.baseUrl}/filter`);
  }
}
