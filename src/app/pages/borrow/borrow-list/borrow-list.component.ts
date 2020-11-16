import { Component, OnInit } from '@angular/core';

import { Rental } from '@models/rental/rental';

import { BorrowStatus } from '@enums/borrow-status.enum';
import { Color } from '@enums/color.enum';

import { RentalService } from '@services/api/rental.service';
import { SnakeBarService } from '@services/ui/snake-bar.service';

import { rental } from '../../../fixtures/rental.fixture';

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
    private snakeBarService: SnakeBarService
  ) {}

  ngOnInit(): void {
    this.updateRentals();
  }

  getBorrows(): void {
    this.rentalService.getBorrows().subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        this.rentals = res.data;
        this.fakeRentals();
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
        this.fakeRentals();
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  fakeRentals() {
    for (const x of Array(10).keys()) {
      const temp = { ...rental };
      temp.status = x;
      this.rentals.push(temp);
    }
  }

  updateRentals(): void {
    if (this.isRental) {
      this.getRentals();
    } else {
      this.getBorrows();
    }
  }

  getStatusText(status: BorrowStatus): string {
    switch (status) {
      case BorrowStatus.applyCancel:
        return '申請取消';
      case BorrowStatus.cancel:
        return '已取消';
      case BorrowStatus.beReturned:
        return '被退貨';
      case BorrowStatus.beClaim:
        return '被求償';
      case BorrowStatus.notPlaced:
        return '未寄放';
      case BorrowStatus.notPickUp:
        return '未取貨';
      case BorrowStatus.notReturn:
        return '未歸還';
      case BorrowStatus.notRetrieve:
        return '未取回';
      case BorrowStatus.notComment:
        return '未評價';
      default:
        return '未知';
    }
  }

  getStatusColor(status: BorrowStatus): string {
    switch (status) {
      case BorrowStatus.applyCancel:
        return Color.primary5;
      case BorrowStatus.notPlaced:
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
      case BorrowStatus.notPlaced:
        return [new StatusButton('取消訂單', Color.red)];
      case BorrowStatus.notComment:
        return [new StatusButton('評價租方', Color.primary4)];
      default:
        return [new StatusButton('無可執行動作', Color.lightgray, true)];
    }
  }

  getRentalButton(status: BorrowStatus): StatusButton[] {
    switch (status) {
      case BorrowStatus.applyCancel:
        return [
          new StatusButton('同意取消', Color.primary1),
          new StatusButton('拒絕取消', Color.red),
        ];
      case BorrowStatus.notPlaced:
      case BorrowStatus.notPickUp:
        return [new StatusButton('拒絕交易', Color.red)];
      case BorrowStatus.notComment:
        return [new StatusButton('評價借方', Color.primary4)];
      default:
        return [new StatusButton('無可執行動作', Color.lightgray, true)];
    }
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
