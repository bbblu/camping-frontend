import { BorrowDialogComponent } from './../borrow-dialog/borrow-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductGroup } from '../models/product';

import { ApiModel } from '../models/api-model';
import { MatDialog } from '@angular/material/dialog';

import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productGroupId!: number;
  panelOpenState = false;

  productGroup!: ProductGroup;

  constructor(
    private httpService: HttpService,
    private router: ActivatedRoute,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.router.paramMap
      .subscribe(param => {
        this.productGroupId = +param.get('id')!;
        this.getProductDetail(this.productGroupId);
      });
  }

  getProductDetail(id: number): void {
    this.httpService.getData<ProductGroup>(`/product-group/${id}`)
      .subscribe((response: ApiModel<ProductGroup>) => {
        this.productGroup = response.data;
      }, error => {
        console.log(error.error);
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BorrowDialogComponent, {
      width: '70%',
      height: '50%',
      data: {
        ...this.productGroup,
        id: this.productGroupId,
      }
    });

  }
}
