import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { ProductGroupDetail } from '@models/product/product-group-detail.model';

import { ProductService } from '@services/api/product.service';
import { SnakeBarService } from '@services/ui/snake-bar.service';

import { BorrowDialogComponent } from '@pages/borrow/borrow-dialog/borrow-dialog.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  productGroupId!: number;
  productGroup!: ProductGroupDetail;

  constructor(
    private productService: ProductService,
    private snakeBarService: SnakeBarService,
    private router: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((param) => {
      this.productGroupId = +param.get('id')!;
      this.getProductDetail(this.productGroupId);
    });
  }

  getProductDetail(id: number): void {
    this.productService.getProductGroup(id).subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        this.productGroup = res.data;
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  starFill(comment: number): number[] {
    const fill = Math.floor(comment);
    return [...Array(fill).keys()];
  }

  starHalf(comment: number): boolean {
    return comment % 1 > 0;
  }

  starEmpty(comment: number): number[] {
    const empty = Math.floor(5 - comment);
    return [...Array(empty).keys()];
  }

  openDialog(): void {
    this.dialog.open(BorrowDialogComponent, {
      width: '80%',
      height: '80%',
      data: {
        ...this.productGroup,
        id: this.productGroupId,
      },
    });
  }
}
