import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      description: [null, Validators.required],
    });
  }

  onSubmit(): void {
    let action!: Observable<ApiModel<string>>;
    switch (this.data.title) {
      case '取消交易':
        action = this.rentalStatusService.cancelRental(this.data.rentalId);
        break;
      case '同意出租':
        action = this.rentalStatusService.agreeRental(this.data.rentalId);
        break;
      case '拒絕出租':
        action = this.rentalStatusService.denyRental(this.data.rentalId);
        break;
      case '扣除手續費終止交易':
        action = this.rentalStatusService.terminalRental(
          this.data.rentalId,
          this.form.value
        );
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
