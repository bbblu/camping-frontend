import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BadRecord } from '@models/user/comment-and-bad-record.model';
import { ProductGroup } from '@models/product/product-group.model';

import { UserService } from '@services/api/user.service';
import { ProductService } from '@services/api/product.service';
import { SnakeBarService } from '@services/ui/snake-bar.service';

@Component({
  selector: 'app-user-product',
  templateUrl: './user-product.component.html',
  styleUrls: ['./user-product.component.scss'],
})
export class UserProductComponent implements OnInit {
  productGroups: ProductGroup[] = [];
  account: string = '';
  comment: number = 0;
  badRecords: BadRecord[] = [];
  nickName: string = '';
  isEdit = true;

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private snakeBarService: SnakeBarService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const account = this.route.snapshot.paramMap.get('account');
    const nickName = this.route.snapshot.queryParamMap.get('nickName') || '';
    if (account) {
      this.account = account;
      this.nickName = nickName;
      this.isEdit = false;
      this.getUserCommentAndBadRecord();
      this.getUserProductGroups();
    } else {
      this.getUserInfo();
    }
  }

  getUserInfo(): void {
    this.userService.getUser().subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        this.account = res.data.account;
        this.nickName = res.data.nickName;
        this.getUserCommentAndBadRecord();
        this.getUserProductGroups();
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  getUserCommentAndBadRecord(): void {
    this.userService.getUserCommentAndBadRecord(this.account).subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        this.comment = res.data.comment;
        this.badRecords = res.data.badRecordArray;
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  getUserProductGroups(): void {
    this.productService.getProductGroupsByUser(this.account).subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        this.productGroups = res.data;
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }
}
