import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ApiModel } from '@models/api-model';

import { RentalStatusService } from '@services/api/rental-status.service';
import { SnakeBarService } from '@services/ui/snake-bar.service';

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
    private rentalStatusService: RentalStatusService,
    private snakeBarService: SnakeBarService,
    private dialogRef: MatDialogRef<BorrowActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BorrowActionDialogData
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.data);

    let action!: Observable<ApiModel<string>>;
    switch (this.data.title) {
      case '取消交易':
        action = this.rentalStatusService.cancelRental(this.data.rentalId);
        break;
      case '同意出借':
        action = this.rentalStatusService.agreeRental(this.data.rentalId);
        break;
      case '拒絕出借':
        action = this.rentalStatusService.denyRental(this.data.rentalId);
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
