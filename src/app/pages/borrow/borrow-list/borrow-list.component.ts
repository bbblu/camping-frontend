import { Component, OnInit } from '@angular/core';

import { Rental } from '@models/rental/rental';

import { BorrowStatus } from '@enums/borrow-status.enum';

import { rental } from '../../../fixtures/rental.fixture';

@Component({
  selector: 'app-borrow-list',
  templateUrl: './borrow-list.component.html',
  styleUrls: ['./borrow-list.component.scss'],
})
export class BorrowListComponent implements OnInit {
  isChecked = true;
  rentals: Rental[] = [];
  selectRental!: Rental;

  constructor() {}

  ngOnInit(): void {
    this.fakeRentals();
  }

  fakeRentals() {
    for (const x of Array(10).keys()) {
      const temp = { ...rental };
      temp.status = Math.floor(Math.random() * Math.floor(7));
      this.rentals.push(temp);
    }

    this.selectRental = this.rentals[0];
  }

  getStatusText(status: BorrowStatus): string {
    switch (status) {
      case BorrowStatus.alreadyCancel:
        return '已取消';
      case BorrowStatus.notPickUp:
        return '未取貨';
      case BorrowStatus.checkBorrow:
        return '檢查中';
      case BorrowStatus.notReturn:
        return '未歸還';
      case BorrowStatus.checkRental:
        return '檢查中';
      case BorrowStatus.notComment:
        return '未評價';
      case BorrowStatus.alreadyComment:
        return '已評價';
      default:
        return '未知';
    }
  }

  getStatusButton(status: BorrowStatus): string {
    switch (status) {
      case BorrowStatus.alreadyCancel:
        return '已取消';
      case BorrowStatus.notPickUp:
        return '取貨完成';
      case BorrowStatus.checkBorrow:
        return '檢查完成';
      case BorrowStatus.notReturn:
        return '主動回報';
      case BorrowStatus.checkRental:
        return '等待檢查';
      case BorrowStatus.notComment:
        return '評價';
      case BorrowStatus.alreadyComment:
        return '已評價';
      default:
        return '未知';
    }
  }

  getStatusColor(status: BorrowStatus): string {
    switch (status) {
      case BorrowStatus.notPickUp:
        return '#c0dd6f';
      case BorrowStatus.checkBorrow:
      case BorrowStatus.checkRental:
        return '#72c1f2';
      case BorrowStatus.notReturn:
        return '#f291a3';
      case BorrowStatus.notComment:
        return '#f2c849';
      default:
        return 'lightgray';
    }
  }

  updateSelectRental(rental: Rental): void {
    this.selectRental = rental;
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
