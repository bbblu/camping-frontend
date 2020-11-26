import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

import { ProductType } from '@models/product/product-type.model';
import { Product } from '@models/product/product.model';
import { ProductImage } from '@models/product/product-image.model';
import { SliderImage } from '@models/product/slider-image.model';

import { ProductService } from '@services/api/product.service';
import { SnakeBarService } from '@services/ui/snake-bar.service';

import { ImageCropperDialogComponent } from '@components/image-cropper-dialog/image-cropper-dialog.component';

export interface DialogData {
  product: Product;
}

@Component({
  selector: 'app-product-form-dialog',
  templateUrl: './product-form-dialog.component.html',
  styleUrls: ['./product-form-dialog.component.scss'],
})
export class ProductFormDialogComponent implements OnInit {
  form!: FormGroup;
  productTypes: ProductType[] = [];
  productImages: SliderImage[] = [];
  imageIndex = 0;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private snakeBarService: SnakeBarService,
    private dialogRef: MatDialogRef<ImageCropperDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: DialogData
  ) {}

  ngOnInit(): void {
    this.getProductTypes();

    this.form = this.formBuilder.group({
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

    if (this.data) {
      this.updateFormValue(this.data.product);
      this.productImages = this.imageToSliderObject(
        this.data.product.imageArray
      );
    }
  }

  getProductTypes(): void {
    this.productService.getProductTypes().subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        this.productTypes = res.data;
        this.updateFormType();
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  updateFormValue(data: Product) {
    this.form.patchValue(data);
  }

  updateFormType(): void {
    const productType = this.productTypes.find(
      (type) => type.name === this.form.value.type
    );
    this.form.patchValue({ type: productType?.id });
  }

  imageToSliderObject(images: ProductImage[] | null): SliderImage[] {
    if (!images) {
      return [];
    }

    return images.map((image) => new SliderImage(image.url));
  }

  updateImageIndex(arrow: string) {
    if (arrow === 'previous') {
      this.imageIndex -= 1;
    } else if (arrow === 'next') {
      this.imageIndex += 1;
    }
  }

  openImageDialog(isEdit: boolean): void {
    const dialogRef = this.dialog.open(ImageCropperDialogComponent, {
      width: '70%',
      data: {
        image: isEdit ? this.productImages[this.imageIndex].image : '',
        isEdit: isEdit,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (!data) {
        return;
      }

      if (data.isEdit) {
        this.productImages[this.imageIndex] = new SliderImage(data.image);
        this.productImages = [...this.productImages];
      } else {
        this.productImages.push(new SliderImage(data.image));
      }

      this.form.patchValue({
        imageArray: this.productImages.map((image) => {
          return {
            url: image.image,
          };
        }),
      });

      this.imageIndex = 0;
    });
  }

  deleteProductImage(): void {
    this.productImages.splice(this.imageIndex, 1);
    this.imageIndex = 0;
  }

  onSubmit(): void {
    this.dialogRef.close(this.form.value);
  }
}
