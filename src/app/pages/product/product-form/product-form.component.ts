import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

import { ApiModel } from '@models/api-model';
import { Image, Product } from '@models/product/product-group-detail.model';
import { ProductGroupEdit } from '@models/product/product-group-edit.model';
import { ProductType } from '@models/product/product-group-filter.model';

import { ProductService } from '@services/api/product.service';
import { CityService } from '@services/api/city.service';
import { SnakeBarService } from '@services/ui/snake-bar.service';

import { ImageCropperDialogComponent } from '@components/image-cropper-dialog/image-cropper-dialog.component';
import { ProductFormDialogComponent } from '@pages/product/product-form-dialog/product-form-dialog.component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  form!: FormGroup;
  cities: string[] = [];
  areas: string[] = [];
  coverImage: string = '';
  isEdit = false;

  productId!: number;
  products: Product[] = [];
  productTypes: ProductType[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private cityService: CityService,
    private snakeBarService: SnakeBarService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProductTypes();
    this.getCities();

    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      borrowStartDate: [null, [Validators.required]],
      borrowEndDate: [null, [Validators.required]],
      cityId: [null, [Validators.required]],
      cityName: [null, [Validators.required]],
      cityAreaName: [null, [Validators.required]],
      price: [null, [Validators.required]],
      coverImage: [null],
      bankAccount: [null, [Validators.required]],
      productArray: [[]],
    });

    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      this.isEdit = true;
      this.getProductEdit(this.productId);
    }
  }

  getProductEdit(id: number): void {
    this.productService.getProductGroupForEdit(id).subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        this.updateFormValue(res.data);
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  updateFormValue(data: ProductGroupEdit): void {
    data.city = '台北市 中正區';
    const city = data.city.split(' ');
    this.cityService.selectCity = city[0];
    this.cityService.selectArea = city[1];

    this.form.patchValue({
      name: data.name,
      borrowStartDate: new Date(data.borrowStartDate),
      borrowEndDate: new Date(data.borrowEndDate),
      cityId: this.cityService.areaId,
      cityName: city[0],
      cityAreaName: city[1],
      price: data.price,
      coverImage: data.coverImage,
      bankAccount: data.bankAccount,
      productArray: data.productArray,
    });

    this.products = data.productArray;
    this.updateAreas();
  }

  getProductTypes() {
    this.productService.getProductTypes().subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        this.productTypes = res.data;
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  getCities(): void {
    this.cityService.getCity().subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        this.cityService.cities = res.data;
        this.cities = this.cityService.cityNames;
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  updateAreas(): void {
    this.cityService.selectCity = this.form.value.cityName;
    this.areas = this.cityService.areaNames;
  }

  updateAreaId(): void {
    this.cityService.selectArea = this.form.value.cityAreaName;
    this.form.value.cityId = this.cityService.areaId;
  }

  imageToSliderObject(images: Image[]): object[] {
    return images.map((image) => {
      return {
        image: image.url,
        thumbImage: image.url,
        alt: 'detail image',
      };
    });
  }

  openCoverImageDialog(isEdit: boolean): void {
    const dialogRef = this.dialog.open(ImageCropperDialogComponent, {
      width: '70%',
      data: {
        image: isEdit ? this.coverImage : '',
        isEdit: isEdit,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (!data) {
        return;
      }

      this.coverImage = data.image;
      this.form.patchValue({
        coverImage: this.coverImage,
      });
    });
  }

  deleteCoverImage(): void {
    this.coverImage = '';
    this.form.patchValue({
      coverImage: this.coverImage,
    });
  }

  openProductDialog(): void {
    const dialogRef = this.dialog.open(ProductFormDialogComponent, {
      width: '80%',
      height: '80%',
      data: {
        productTypes: this.productTypes,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (!data) {
        return;
      }

      this.form.value.productArray.push(data);
      this.products = this.form.value.productArray;
    });
  }

  dateFormatter(value: Date): string {
    const date = new Date(value as Date);
    return moment(date).format('YYYY/MM/DD');
  }

  onSubmit(): void {
    let action!: Observable<ApiModel<string>>;
    const data = {
      ...this.form.value,
      borrowStartDate: this.dateFormatter(this.form.value.borrowStartDate),
      borrowEndDate: this.dateFormatter(this.form.value.borrowEndDate),
    };

    action = this.isEdit
      ? this.productService.updateProductGroup(this.productId, data)
      : this.productService.addProductGroup(data);

    action.subscribe(
      (res) => {
        this.snakeBarService.open(res.message);
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }
}
