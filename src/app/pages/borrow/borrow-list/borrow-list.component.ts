import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { Rental, User } from '@models/rental/rental';

import { BorrowStatus } from '@enums/borrow-status.enum';
import { Color } from '@enums/color.enum';

import { RentalService } from '@services/api/rental.service';
import { SnakeBarService } from '@services/ui/snake-bar.service';

import { BorrowActionDialogComponent } from '@pages/borrow/borrow-action-dialog/borrow-action-dialog.component';
import { BorrowPaymentDialogComponent } from '@pages/borrow/borrow-payment-dialog/borrow-payment-dialog.component';
import { BorrowCommentDialogComponent } from '@pages/borrow/borrow-comment-dialog/borrow-comment-dialog.component';

class StatusButton {
  text: string;
  color: Color;
  disable: boolean;

  constructor(text: string, color: Color, disable: boolean = false) {
    this.text = text;
    this.color = color;
    this.disable = disable;
  }
}

@Component({
  selector: 'app-borrow-list',
  templateUrl: './borrow-list.component.html',
  styleUrls: ['./borrow-list.component.scss'],
})
export class BorrowListComponent implements OnInit {
  isRental = false;
  rentals: Rental[] = [];

  constructor(
    private rentalService: RentalService,
    private snakeBarService: SnakeBarService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBorrows();
  }

  getBorrows(): void {
    this.rentalService.getBorrows().subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        this.rentals = res.data;
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  getRentals(): void {
    this.rentalService.getRentals().subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        this.rentals = res.data;
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  updateRentals(isRental: boolean): void {
    if (isRental) {
      this.getRentals();
    } else {
      this.getBorrows();
    }
  }

  toUserProduct(user: User): void {
    this.router.navigate(['user', user.account, 'product'], {
      queryParams: { nickName: user.account },
    });
  }

  getStatusText(status: BorrowStatus): string {
    switch (status) {
      case BorrowStatus.alreadyCancel:
        return '已取消';
      case BorrowStatus.alreadyReturn:
        return '已退貨';
      case BorrowStatus.alreadyTerminate:
        return '已終止';
      case BorrowStatus.alreadyRetrieve:
        return '已取回';
      case BorrowStatus.notAgree:
        return '未同意';
      case BorrowStatus.notPay:
        return '未付款';
      case BorrowStatus.notPlace:
        return '未寄放';
      case BorrowStatus.notPickUp:
        return '未領取';
      case BorrowStatus.notReturn:
        return '未歸還';
      case BorrowStatus.notRetrieve:
        return '未取回';
      case BorrowStatus.notComment:
        return '未評價';
      case BorrowStatus.alreadyComment:
        return '已評價';
      default:
        return '未知';
    }
  }

  getStatusColor(status: BorrowStatus): string {
    switch (status) {
      case BorrowStatus.notAgree:
      case BorrowStatus.notPay:
        return Color.primary5;
      case BorrowStatus.notPlace:
      case BorrowStatus.notPickUp:
        return Color.primary1;
      case BorrowStatus.notReturn:
      case BorrowStatus.notRetrieve:
        return Color.primary2;
      case BorrowStatus.notComment:
        return Color.primary4;
      default:
        return Color.lightgray;
    }
  }

  getStatusButton(status: BorrowStatus): StatusButton[] {
    return this.isRental
      ? this.getRentalButton(status)
      : this.getBorrowButton(status);
  }

  getBorrowButton(status: BorrowStatus): StatusButton[] {
    switch (status) {
      case BorrowStatus.notAgree:
        return [new StatusButton('取消交易', Color.red)];
      case BorrowStatus.notPay:
        return [
          new StatusButton('取消交易', Color.red),
          new StatusButton('付款', Color.primary2),
        ];
      case BorrowStatus.notPlace:
        return [new StatusButton('取消交易', Color.red)];
      case BorrowStatus.notPickUp:
        return [new StatusButton('扣除手續費終止交易', Color.red)];
      case BorrowStatus.notComment:
        return [new StatusButton('評價租方', Color.primary4)];
      default:
        return [new StatusButton('無可執行動作', Color.lightgray, true)];
    }
  }

  getRentalButton(status: BorrowStatus): StatusButton[] {
    switch (status) {
      case BorrowStatus.notAgree:
        return [
          new StatusButton('拒絕出租', Color.red),
          new StatusButton('同意出租', Color.primary2),
        ];
      case BorrowStatus.notPay:
      case BorrowStatus.notPlace:
      case BorrowStatus.notPickUp:
        return [new StatusButton('取消交易', Color.red)];
      case BorrowStatus.notComment:
        return [new StatusButton('評價借方', Color.primary4)];
      default:
        return [new StatusButton('無可執行動作', Color.lightgray, true)];
    }
  }

  clickStatusButton(text: string, rental: Rental): void {
    switch (text) {
      case '付款':
        return this.openPaymentDialog(rental);
      case '評價租方':
      case '評價借方':
        return this.openCommentDialog(text, rental);
      default:
        return this.openActionDialog(text, rental);
    }
  }

  openActionDialog(title: string, rental: Rental): void {
    this.dialog.open(BorrowActionDialogComponent, {
      width: window.screen.width <= 960 ? '100%' : '50%',
      data: {
        title: title,
        rentalId: rental.id,
        isCancel: !title.startsWith('同意'),
      },
    });
  }

  openPaymentDialog(rental: Rental): void {
    this.dialog.open(BorrowPaymentDialogComponent, {
      width: window.screen.width <= 960 ? '100%' : '50%',
      data: {
        rentalId: rental.id,
      },
    });
  }

  openCommentDialog(title: string, rental: Rental): void {
    this.dialog.open(BorrowCommentDialogComponent, {
      width: window.screen.width <= 960 ? '100%' : '50%',
      data: {
        title: title,
        rentalId: rental.id,
      },
    });
  }

  imageToSliderObject(images: string[]): object[] {
    return images.map((image) => {
      return {
        image: image,
        thumbImage: image,
        alt: 'detail image',
      };
    });
  }
}
