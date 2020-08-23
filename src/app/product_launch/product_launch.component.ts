import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { ApiModel } from '../models/api-model';
import { HttpService } from '../services/http.service';
import { error } from 'selenium-webdriver';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../models/product';
import { City, ProductGroupFilter, Type } from '../models/product-group-filter';


@Component({
  selector: 'app-product_launch',
  templateUrl: './product_launch.component.html',
  styleUrls: ['./product_launch.component.scss']
})
export class Product_launchComponent implements OnInit {

  productForm!: FormGroup;
  goodsForm!:FormGroup;
  result!: ApiModel<object>;
  productTypes: Type[] = [];
  city!: City;

  /* prodcuts: Product = {
    id: 1,
    title: '標題',
    start_date:new Date(2020,08,15),
    end_date: new Date(2020,08,20),
    city: '台北市',
    price: 2000,
    coverImage: new URL("https://youtu.be/5qeY9f0hrxc"),
    ProductName: '客廳帳篷',
    ProductQuantity: 2,
    ProductSize: '3m*3m*2m',
    ProductUse: '自己搭 廢物',
    ProductLink: new URL("https://youtu.be/5qeY9f0hrxc"),
    ProductBrand: 'Nike',
    Compensation: '全額',
    Remarks: '小夫我要進去囉'
  }; */

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private httpService: HttpService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCityData();

    this.productForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      start_date: [null, [Validators.required]],
      end_date: [null, [Validators.required]],
      city: [null, [Validators.required]],
      cityAreaName: [null, [Validators.required]],
      price: [null, [Validators.required]],
      bank:[null, [Validators.required]],
    });

    this.goodsForm = this.formBuilder.group({
      ProductName: [null, [Validators.required]],
      coverImage: [null, [Validators.required]],
      ProductQuantity: [null, [Validators.required]],
      ProductSize: [null, [Validators.required]],
      ProductUse: [null, []],
      ProductLink: [null, []],
      ProductBrand: [null, []],
      Compensation: [null, []],
      Remarks: [null, []]
    });
  }

  getCityData(): void {
    this.httpService.getData<ProductGroupFilter>('/product-group/filter')
      .subscribe((response: ApiModel<ProductGroupFilter>) => {
        this.productTypes = response.data.type;
        this.city = response.data.city;
      });
  }

  onSubmit() {
    console.log(this.productForm.value);
  };


}
