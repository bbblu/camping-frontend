import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { MatIconRegistry } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { Product } from '@models/product/product.model';
import { ProductType } from '@models/product/product-type.model';
import { ProductImage } from '@models/product/product-image.model';
import { SliderImage } from '@models/product/slider-image.model';

import { ProductFormDialogComponent } from '@pages/product/product-form-dialog/product-form-dialog.component';
import { ProductService } from '@services/api/product.service';
import { SnakeBarService } from '@services/ui/snake-bar.service';

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
  productTypes: ProductType[] = [];
  isClickButton = false;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private productService: ProductService,
    private snakeBarService: SnakeBarService,
    private dialog: MatDialog
  ) {
    iconRegistry.addSvgIcon(
      'tent',
      sanitizer.bypassSecurityTrustResourceUrl('assets/image/tent.svg')
    );
  }

  ngOnInit(): void {
    this.getProductTypes();
  }

  imageToSliderObject(images: ProductImage[] | null): SliderImage[] {
    if (!images) {
      return [];
    }

    return images.map((image) => new SliderImage(image.url));
  }

  getProductTypes(): void {
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

  getProductType(product: Product): string {
    if (this.isEdit) {
      return this.productTypes.find((type) => type.id === product.type)!.name;
    } else {
      return product.type;
    }
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
