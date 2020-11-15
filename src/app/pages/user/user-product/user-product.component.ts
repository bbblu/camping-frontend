import { Component, Input, OnInit } from '@angular/core';

import { ProductGroup } from '@models/product/product-group.model';
import { User } from '@models/user/user.model';

import { UserService } from '@services/api/user.service';
import { ProductService } from '@services/api/product.service';
import { SnakeBarService } from '@services/ui/snake-bar.service';

import { products } from '../../../fixtures/product-group.fixture';

@Component({
  selector: 'app-user-product',
  templateUrl: './user-product.component.html',
  styleUrls: ['./user-product.component.scss'],
})
export class UserProductComponent implements OnInit {
  @Input() isEdit = true;

  productGroups: ProductGroup[] = [];
  user!: User;

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private snakeBarService: SnakeBarService
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.userService.getUser().subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        this.user = res.data;
        this.getUserProductGroups();
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  getUserProductGroups(): void {
    this.productService.getProductGroupsByUser(this.user.account).subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        // this.productGroups = res.data;
        this.productGroups = products;
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }
}
