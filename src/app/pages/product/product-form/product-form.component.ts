import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

import { ProductType } from '@models/product/product-group-filter.model';

import { ProductService } from '@services/api/product.service';
import { CityService } from '@services/api/city.service';
import { SnakeBarService } from '@services/ui/snake-bar.service';
import {
  Image,
  Product,
  ProductGroupDetail,
} from '@models/product/product-group-detail.model';

import { ProductFormDialogComponent } from '@pages/product/product-form-dialog/product-form-dialog.component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  form!: FormGroup;
  cities: string[] = [];
  cityIndex = 0;
  areas: string[] = [];
  isEdit = false;

  productGroup!: ProductGroupDetail;
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
      cityName: [null, [Validators.required]],
      cityAreaName: [null, [Validators.required]],
      price: [null, [Validators.required]],
      coverImage: [null],
      bankAccount: [null, [Validators.required]],
      productArray: [[]],
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.isEdit = true;
      this.getProductDetail(id);
    }
  }

  getProductDetail(id: number): void {
    this.productService.getProductGroup(id).subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        this.productGroup = res.data;
        this.updateFormValue(this.productGroup);
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  updateFormValue(data: ProductGroupDetail): void {
    this.form.patchValue({
      name: data.name,
      borrowStartDate: data.borrowStartDate,
      borrowEndDate: data.borrowEndDate,
      cityName: data.city,
      cityAreaName: data.city,
      price: data.price,
      coverImage: data.coverImage,
      bankAccount: '',
      productArray: data.productArray,
    });
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

        this.cities = res.data.nameArray;
        this.areas = res.data.areaNameArray[this.cityIndex];
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  updateCityIndex(index: number) {
    this.cityIndex = index;
  }

  addProducts(product: Product): void {
    this.form.value.productArray.push(product);
  }

  removeProducts(index: number): void {
    this.form.value.productArray.splice(index);
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

  dateFormatter(value: Date): string {
    const date = new Date(value as Date);
    return moment(date).format('YYYY/MM/DD hh:mm');
  }

  onSubmit(): void {
    this.productService
      .addProductGroup({
        ...this.form.value,
        borrowStartDate: this.dateFormatter(this.form.value.borrowStartDate),
        borrowEndDate: this.dateFormatter(this.form.value.borrowEndDate),
      })
      .subscribe(
        (res) => {
          this.snakeBarService.open(res.message);
        },
        (err) => {
          this.snakeBarService.open(err.error.message);
        }
      );
  }

  openDialog(): void {
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

      this.addProducts(data);
      this.products = this.form.value.productArray;
    });
  }
}
