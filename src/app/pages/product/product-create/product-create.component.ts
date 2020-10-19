import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';

import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, share, takeUntil } from 'rxjs/operators';

import { ProductType } from '@models/product/product-group-filter.model';
import { City } from '@models/city/city.model';
import { Image } from '@models/product/image.model';

import { ProductService } from '@services/api/product.service';
import { CityService } from '@services/api/city.service';

import { ImageCropperDialogComponent } from '@components/image-cropper-dialog/image-cropper-dialog.component';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent implements OnInit, OnDestroy {
  groupForm!: FormGroup;
  cities$!: Observable<string[]>;
  cityIndex$ = new BehaviorSubject<number>(-1);
  areas$!: Observable<string[]>;

  productForm!: FormGroup;
  productTypes$!: Observable<ProductType[]>;
  productImages: Image[] = [];
  imageIndex = 0;

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private cityService: CityService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProductTypeData();
    this.getCityData();

    this.groupForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      borrowStartDate: [null, [Validators.required]],
      borrowEndDate: [null, [Validators.required]],
      cityName: [null, [Validators.required]],
      cityAreaName: [null, [Validators.required]],
      price: [null, [Validators.required]],
      coverImage: [null],
      bankAccount: [null, [Validators.required]],
      productArrays: [[]],
    });

    this.productForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      count: [null, [Validators.required]],
      brand: [null, [Validators.required]],
      appearance: [null, [Validators.required]],
      useInformation: [null, [Validators.required]],
      brokenCompensation: [null, [Validators.required]],
      relatedLink: [null],
      memo: [null],
      imageArray: [null],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getProductTypeData() {
    this.productTypes$ = this.productService.getProductTypes().pipe(
      takeUntil(this.destroy$),
      map((res) => res.data)
    );
  }

  getCityData(): void {
    const cityData$: Observable<City> = this.cityService.getCities().pipe(
      takeUntil(this.destroy$),
      map((res) => res.data),
      share()
    );
    this.cities$ = cityData$.pipe(map((data) => data.nameArray));
    this.areas$ = combineLatest(cityData$, this.cityIndex$).pipe(
      filter(([_, index]) => index >= 0),
      map(([city, index]) => city.areaNameArray[index])
    );
  }

  pushProductArray(): void {
    this.groupForm.value.productArrays.push(this.productForm.value);
  }

  removeProductArray(i: number): void {
    this.groupForm.value.productArrays.splice(i);
  }

  onSubmit(): void {}

  updateImageIndex(arrow: string) {
    if (arrow === 'previous') {
      this.imageIndex -= 1;
    } else if (arrow === 'next') {
      this.imageIndex += 1;
    }
  }

  openProductImageDialog(action: string): void {
    const dialogRef = this.dialog.open(ImageCropperDialogComponent, {
      width: '70%',
      data: {
        image:
          action === 'update' ? this.productImages[this.imageIndex].image : '',
        action: action,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (!data) {
        return;
      }

      if (data.action === 'create') {
        this.productImages.push({
          image: data.image,
          thumbImage: data.image,
        });
      } else {
        this.productImages[this.imageIndex] = {
          image: data.image,
          thumbImage: data.image,
        };
        this.productImages = [...this.productImages];
      }

      this.productForm.patchValue({
        imageArray: this.productImages,
      });

      this.imageIndex = 0;
    });
  }

  deleteProductImage(): void {
    this.productImages.splice(this.imageIndex, 1);
    this.imageIndex = 0;
  }
}
