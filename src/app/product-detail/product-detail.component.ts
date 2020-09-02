import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductGroup } from '../models/product';

import { ApiModel } from '../models/api-model';

import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  panelOpenState = false;

  productGroup!: ProductGroup;

  constructor(
    private httpService: HttpService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.router.paramMap
      .subscribe(param => {
        const id = +param.get('id')!;
        this.getProductDetail(id);
      });
  }

  getProductDetail(id: number): void {
    this.httpService.getData<ProductGroup>(`/product-group/${id}`)
      .subscribe((response: ApiModel<ProductGroup>) => {
        this.productGroup = response.data;
      }, error => {
        console.log(error.error);
      });
  }

}
