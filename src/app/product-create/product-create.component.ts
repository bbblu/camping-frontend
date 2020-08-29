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
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

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
    borrowStartDate: new Date(),
    borrowEndDate: new Date(),
    city: '台北市',
    price: 2000,
    bankAccount: '香港3345678',
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
      name: [null, [Validators.required]],
      borrowStartDate: [null, [Validators.required]],
      borrowEndDate: [null, [Validators.required]],
      city: [null, [Validators.required]],
      cityAreaName: [null, [Validators.required]],
      price: [null, [Validators.required]],
      bankAccount: [null, [Validators.required]],
      coverImage:[null, [Validators.required]]
    });

    this.goodsForm = this.formBuilder.group({
      imageArray: [null, [Validators.required]],
      name: [null, [Validators.required]],
      count: [null, [Validators.required]],
      ProductSize: [null, [Validators.required]],
      useInformation: [null, []],
      relatedLinkArray: [null, []],
      brand: [null, []],
      brokenCompensation: [null, []],
      memo: [null, []]
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
