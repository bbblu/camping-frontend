import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { MatIconRegistry } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { Image, Product } from '@models/product/product-group-detail.model';

import { ProductFormDialogComponent } from '@pages/product/product-form-dialog/product-form-dialog.component';

@Component({
  selector: 'app-product-expansion-panel',
  templateUrl: './product-expansion-panel.component.html',
  styleUrls: ['./product-expansion-panel.component.scss'],
})
export class ProductExpansionPanelComponent implements OnInit {
  @Input() products: Product[] = [];
  @Input() isEdit = false;
  @Output() editProduct = new EventEmitter<{
    index: number;
    product: Product;
  }>();
  @Output() deleteProduct = new EventEmitter<number>();
  isClickButton = false;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) {
    iconRegistry.addSvgIcon(
      'tent',
      sanitizer.bypassSecurityTrustResourceUrl('assets/image/tent.svg')
    );
  }

  ngOnInit(): void {}

  imageToSliderObject(images: Image[]): object[] {
    if (!images) {
      return [];
    }

    return images.map((image) => {
      return {
        image: image.url,
        thumbImage: image.url,
        alt: 'detail image',
      };
    });
  }

  clickEdit(index: number): void {
    this.isClickButton = true;

    const dialogRef = this.dialog.open(ProductFormDialogComponent, {
      width: '80%',
      height: '80%',
      data: {
        product: this.products[index],
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (!data) {
        return;
      }
      this.editProduct.emit({ index: index, product: data });
    });
  }

  clickDelete(index: number): void {
    this.isClickButton = true;
    this.deleteProduct.emit(index);
  }
}
