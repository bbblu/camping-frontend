import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ImageCroppedEvent } from 'ngx-image-cropper';

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
  goodsForm!: FormGroup;
  result!: ApiModel<object>;
  productTypes: Type[] = [];
  city!: City;

  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  products: Product = {
    title: '標題',
    start_date: new Date(),
    end_date: new Date(),
    city: '台北市',
    price: 2000,
    bank: '香港3345678',
    coverImage: new URL("https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAHqtxV.img?h=630&w=1200&m=6&q=60&o=t&l=f&f=jpg&x=829&y=428"),
    ProductName: '快搭客廳炊事帳',
    ProductQuantity: 2,
    ProductSize: '3m*3m*2.5m(高)',
    ProductUse: '四人同時往外拉，並往上推，小心不要夾到手。若遇下雨，必須曬乾再收起來',
    ProductLink: new URL("https://youtu.be/5qeY9f0hrxc"),
    ProductBrand: '無',
    Compensation: '損壞至無法使用，原價七折賠償。損壞布面，原價五成賠償。損壞小部分但堪用，原價三成賠償',
    Remarks: '無'
  };

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
      bank: [null, [Validators.required]],
    });

    this.goodsForm = this.formBuilder.group({
      coverImage: [null, [Validators.required]],
      ProductName: [null, [Validators.required]],
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
