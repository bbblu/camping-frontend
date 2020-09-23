import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { ApiModel } from '../models/api-model';
import { Product } from '../models/product';
import { City, ProductGroupFilter, Type } from '../models/product-group-filter';

import { HttpService } from '../services/http.service';

import { ImageCroppedDialogComponent } from '../image-cropped-dialog/image-cropped-dialog.component';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  productForm!: FormGroup;
  goodsForm!: FormGroup;
  productTypes: Type[] = [];
  city!: City;
  croppedImages: string[] = [];
  order!: 0;
  name: string[] = [];
  gooodName = this.name[this.order];
  count: string[] = [];
  gooodCount = this.count[this.order];
  productSize: string[] = [];
  gooodproductSize = this.productSize[this.order];
  useInformation: string[] = [];
  gooodUseInformation = this.useInformation[this.order];
  relatedLinkArray: string[] = [];
  gooodRelatedLinkArray = this.relatedLinkArray[this.order];
  brand: string[] = [];
  gooodBrand = this.brand[this.order];
  brokenCompensation: string[] = [];
  gooodBrokenCompensation = this.brokenCompensation[this.order];
  memo: string[] = [];
  gooodMemo = this.memo[this.order];

  /*已新增商品之圖片陣列*/
  imageObject: Array<object> = [{
    image: 'assets/image/logo.png',
    thumbImage: 'assets/image/logo.png',
  }];

  /*新增中商品之圖片陣列*/
  goodsImages: Array<object> = [{
    image: 'assets/image/logo.png',
    thumbImage: 'assets/image/logo.png',
  }];

  openDialog(): void {
    const dialogRef = this.dialog.open(ImageCroppedDialogComponent, {
      width: '70%',
      data: { croppedImageBase64: this.croppedImages },
    });

    dialogRef.afterClosed().subscribe(images => {
      this.croppedImages = images;
      this.imageObject = [];
      this.goodsImages = [];

      for (const image of images) {
        if (!image) {
          continue;
        }

        this.imageObject.push({
          image,
          thumbImage: image,
        });
        this.goodsImages.push({
          image,
          thumbImage: image,
        });
      }
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    public dialog: MatDialog
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
      coverImage: [null, [Validators.required]],
      productArrays: this.formBuilder.array([])
    });

    this.goodsForm = this.formBuilder.group({
      imageArray: [null, [Validators.required]],
      name: [null, [Validators.required]],
      count: [null, [Validators.required]],
      productSize: [null, [Validators.required]],
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

  /* doCreateProduct(): void {
    this.productArrays.push(new FormGroup({
      id: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      imageArray: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      count: new FormControl('', Validators.required),
      productSize: new FormControl('', Validators.required),
      useInformation: new FormControl(''),
      relatedLinkArray: new FormControl(''),
      brand: new FormControl(''),
      brokenCompensation: new FormControl(''),
      memo: new FormControl(''),
    }));
  } */

  doCreateProduct(): void {
    this.updateGoodsForm();
    this.pushToArray();
  }


  get productArrays(): FormArray {
    return this.productForm.controls.productArrays as FormArray;
  }

  onSubmit(): void {
  }

  updateGoodsForm(): void {
    this.goodsForm.patchValue({
      imageArray: this.goodsImages,
    });
    console.log(this.goodsForm.value);
  }

  pushToArray(): void {
    const productArrays = this.productForm.get('productArrays');
    (productArrays as FormArray).push(this.formBuilder.group({
      imageArray: this.goodsImages,
      name: this.goodsForm.value.name,
      count: this.goodsForm.value.count,
      productSize: this.goodsForm.value.productSize,
      useInformation: this.goodsForm.value.useInformation,
      relatedLinkArray: this.goodsForm.value.relatedLinkArray,
      brand: this.goodsForm.value.brand,
      brokenCompensation: this.goodsForm.value.brokenCompensation,
      memo: this.goodsForm.value.memo
    }));
    this.name.push(this.goodsForm.value.name);
    this.count.push(this.goodsForm.value.count);
    this.productSize.push(this.goodsForm.value.productSize);
    this.useInformation.push(this.goodsForm.value.useInformation);
    this.relatedLinkArray.push(this.goodsForm.value.relatedLinkArray);
    this.brand.push(this.goodsForm.value.brand);
    this.brokenCompensation.push(this.goodsForm.value.brokenCompensation);
    this.memo.push(this.goodsForm.value.memo);
  }

  thatMeSeeSee(): void {
    console.log(this.productForm.value);
  }

}
