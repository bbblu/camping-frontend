import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ApiModel } from '@models/api-model';

import { SnakeBarService } from '@services/ui/snake-bar.service';
import { RentalService } from '@services/api/rental.service';

interface BorrowActionDialogData {
  title: string;
  rentalId: number;
  isCancel: boolean;
}

@Component({
  selector: 'app-borrow-action-dialog',
  templateUrl: './borrow-action-dialog.component.html',
  styleUrls: ['./borrow-action-dialog.component.scss'],
})
export class BorrowActionDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private rentalService: RentalService,
    private snakeBarService: SnakeBarService,
    private dialogRef: MatDialogRef<BorrowActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BorrowActionDialogData
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      reason: [null, this.data.isCancel ? Validators.required : null],
    });
  }

  onSubmit(): void {
    let action!: Observable<ApiModel<string>>;
    switch (this.data.title) {
      case '取消訂單':
        action = this.rentalService.cancelRental(this.data.rentalId, {
          ...this.form.value,
          deniedDetail: this.form.value.reason,
        });
        break;
      case '同意取消':
        action = this.rentalService.agreeCancelRental(this.data.rentalId);
        break;
      case '拒絕取消':
        action = this.rentalService.denyCancelRental(this.data.rentalId, {
          ...this.form.value,
          cancelDetail: this.form.value.reason,
        });
        break;
      case '拒絕交易':
        action = this.rentalService.denyRental(this.data.rentalId, {
          ...this.form.value,
          cancelDetail: this.form.value.reason,
        });
        break;
    }

    if (!action) {
      return;
    }

    action.subscribe(
      (res) => {
        this.snakeBarService.open(res.message);
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
