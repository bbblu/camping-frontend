import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { ApiModel } from '../models/api-model';
import { City, ProductGroupFilter, Type } from '../models/product-group-filter';

import { HttpService } from '../services/http.service';

import { ImageCroppedDialogComponent } from '../image-cropped-dialog/image-cropped-dialog.component';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  groupForm!: FormGroup;
  productForm!: FormGroup;
  productTypes: Type[] = [];
  city!: City;

  croppedImages: string[] = [];
  // 新增中商品之圖片陣列
  productImages: Array<object> = [{
    image: 'assets/image/logo.png',
    thumbImage: 'assets/image/logo.png',
  }];

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCityData();

    this.groupForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      borrowStartDate: [null, [Validators.required]],
      borrowEndDate: [null, [Validators.required]],
      city: [null, [Validators.required]],
      cityAreaName: [null, [Validators.required]],
      price: [null, [Validators.required]],
      bankAccount: [null, [Validators.required]],
      coverImage: [null, [Validators.required]],
      productArrays: [[]],
    });

    this.productForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      count: [null, [Validators.required]],
      productSize: [null, [Validators.required]],
      useInformation: [null],
      relatedLinkArray: [null],
      brand: [null],
      brokenCompensation: [null],
      memo: [null],
      imageArray: [null, [Validators.required]],
    });
  }

  getCityData(): void {
    this.httpService.getData<ProductGroupFilter>('/product-group/filter')
      .subscribe((response: ApiModel<ProductGroupFilter>) => {
        this.productTypes = response.data.type;
        this.city = response.data.city;
      });
  }

  pushProductArray(): void {
    this.groupForm.value.productArrays.push(this.productForm.value);
  }

  removeProductArray(i: number): void{
    console.log(i);
    /* this.groupForm.value.productArrays.removeAt(i); */
  }

  onPreview(): void {
    console.log(this.groupForm.value);
  }

  onSubmit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ImageCroppedDialogComponent, {
      width: '70%',
      data: {croppedImages: this.croppedImages},
    });

    dialogRef.afterClosed().subscribe(images => {
      this.croppedImages = images;
      this.productImages = [];

      for (const image of images) {
        if (!image) {
          continue;
        }

        this.productImages.push({
          image,
          thumbImage: image,
        });
      }

      this.productForm.patchValue({
        imageArray: this.productImages,
      });
    });
  }

}
