import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

import { ProductType } from '@models/product/product-group-filter.model';
import { Image } from '@models/product/image.model';
import { ImageCropperDialogComponent } from '@components/image-cropper-dialog/image-cropper-dialog.component';

export interface DialogData {
  productTypes: ProductType[];
}

@Component({
  selector: 'app-product-form-dialog',
  templateUrl: './product-form-dialog.component.html',
  styleUrls: ['./product-form-dialog.component.scss'],
})
export class ProductFormDialogComponent implements OnInit {
  form!: FormGroup;
  productTypes: ProductType[] = [];
  productImages: Image[] = [];
  imageIndex = 0;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ImageCropperDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: DialogData
  ) {}

  ngOnInit(): void {
    this.productTypes = this.data.productTypes;

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
  }

  updateImageIndex(arrow: string) {
    if (arrow === 'previous') {
      this.imageIndex -= 1;
    } else if (arrow === 'next') {
      this.imageIndex += 1;
    }
  }

  openImageDialog(action: string): void {
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

      this.form.patchValue({
        imageArray: this.productImages,
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
