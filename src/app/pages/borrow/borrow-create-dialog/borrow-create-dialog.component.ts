import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';

import { ApiModel } from '@models/api-model';
import { ProductGroupDetail } from '@models/product/product-group.model';

import { RentalService } from '@services/api/rental.service';
import { SnakeBarService } from '@services/ui/snake-bar.service';

interface BorrowCreateDialogData {
  productGroupId: number;
  productGroup: ProductGroupDetail;
}

@Component({
  selector: 'app-borrow-create-dialog',
  templateUrl: './borrow-create-dialog.component.html',
  styleUrls: ['./borrow-create-dialog.component.scss'],
})
export class BorrowCreateDialogComponent implements OnInit {
  minDate!: Date;
  maxDate!: Date;

  form!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BorrowCreateDialogData,
    private formBuilder: FormBuilder,
    private rentalService: RentalService,
    private snakeBarService: SnakeBarService,
    private router: Router,
    private dialogRef: MatDialogRef<BorrowCreateDialogComponent>
  ) {}

  ngOnInit(): void {
    this.minDate = new Date(this.data.productGroup.borrowStartDate);
    this.maxDate = new Date(this.data.productGroup.borrowEndDate);

    this.form = this.formBuilder.group({
      borrowStartDate: [
        this.data.productGroup.borrowStartDate,
        Validators.required,
      ],
      borrowEndDate: [
        this.data.productGroup.borrowEndDate,
        Validators.required,
      ],
    });
  }

  calculateRentalPrice(): number {
    const startDate = new Date(this.form.value.borrowStartDate);
    const endDate = new Date(this.form.value.borrowEndDate);
    const oneDay = 1000 * 60 * 60 * 24;
    const days = (endDate.getTime() - startDate.getTime()) / oneDay + 1;

    return this.data.productGroup.price * days;
  }

  intRange(start: number, end: number): number[] {
    const range = [...Array(end + 1).keys()];
    return range.slice(start, end + 1);
  }

  dateFormatter(value: Date): string {
    const date = new Date(value as Date);
    return moment(date).format('YYYY/MM/DD hh:mm');
  }

  onSubmit(): void {
    const data = {
      productGroupId: this.data.productGroupId,
      borrowStartDate: this.dateFormatter(this.form.value.borrowStartDate),
      borrowEndDate: this.dateFormatter(this.form.value.borrowEndDate),
    };

    this.rentalService.addRental(data).subscribe(
      (res: ApiModel<{ id: number }>) => {
        this.snakeBarService.open(res.message);

        if (res.result) {
          this.dialogRef.close();
          this.router.navigate(['borrow']);
        }
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
