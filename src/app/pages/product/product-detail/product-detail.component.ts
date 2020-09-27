import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { ApiModel } from '@models/api-model';
import { ProductGroup } from '@models/product/product-group-detail.model';

import { ProductService } from '@services/api/product.service';

import { BorrowDialogComponent } from '@pages/borrow/borrow-dialog/borrow-dialog.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  productGroupId!: number;
  productGroup!: ProductGroup;

  constructor(
    private productService: ProductService,
    private router: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((param) => {
      this.productGroupId = +param.get('id')!;
      this.getProductDetail(this.productGroupId);
    });
  }

  getProductDetail(id: number): void {
    this.productService.getProductGroup(id).subscribe(
      (response: ApiModel<ProductGroup>) => {
        this.productGroup = response.data;
      },
      (error) => {
        console.log(error.error);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BorrowDialogComponent, {
      width: '70%',
      height: '50%',
      data: {
        ...this.productGroup,
        id: this.productGroupId,
      },
    });
  }
}
