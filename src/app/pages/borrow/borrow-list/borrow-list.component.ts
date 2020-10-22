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
      temp.status = Math.floor(Math.random() * Math.floor(5));
      this.rentals.push(temp);
    }
  }

  getStatusText(status: BorrowStatus): string {
    switch (status) {
      case BorrowStatus.cancel:
        return '取消';
      case BorrowStatus.notPickUp:
        return '未取貨';
      case BorrowStatus.notReturn:
        return '未歸還';
      case BorrowStatus.alreadyReturn:
        return '已歸還';
      case BorrowStatus.alreadyCheck:
        return '已檢查';
      default:
        return '未知';
    }
  }

  getStatusButton(status: BorrowStatus): string {
    switch (status) {
      case BorrowStatus.cancel:
        return '交易取消';
      case BorrowStatus.notPickUp:
        return '取貨完成';
      case BorrowStatus.notReturn:
        return '歸還完成';
      case BorrowStatus.alreadyReturn:
        return '檢查完成';
      case BorrowStatus.alreadyCheck:
        return '給予評價';
      default:
        return '未知';
    }
  }

  getStatusColor(status: BorrowStatus): string {
    switch (status) {
      case BorrowStatus.notPickUp:
        return '#c0dd6f';
      case BorrowStatus.notReturn:
        return '#f291a3';
      case BorrowStatus.alreadyReturn:
        return '#72c1f2';
      case BorrowStatus.alreadyCheck:
        return '#f2c849';
      default:
        return 'lightgray';
    }
  }

  updateSelectRental(rental: Rental): void {
    this.selectRental = rental;
  }
}
