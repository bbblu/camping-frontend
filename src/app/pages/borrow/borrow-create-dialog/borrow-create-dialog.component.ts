import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

import { ApiModel } from '@models/api-model';
import { User } from '@models/user/user.model';
import { ProductGroupDetail } from '@models/product/product-group-detail.model';

import { RentalService } from '@services/api/rental.service';
import { UserService } from '@services/api/user.service';
import { SnakeBarService } from '@services/ui/snake-bar.service';

@Component({
  selector: 'app-borrow-create-dialog',
  templateUrl: './borrow-create-dialog.component.html',
  styleUrls: ['./borrow-create-dialog.component.scss'],
})
export class BorrowCreateDialogComponent implements OnInit {
  minDate!: Date;
  maxDate!: Date;

  borrowForm!: FormGroup;
  billForm!: FormGroup;

  user!: User;
  rental!: { id: string };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProductGroupDetail,
    private formBuilder: FormBuilder,
    private rentalService: RentalService,
    private userService: UserService,
    private snakeBarService: SnakeBarService
  ) {}

  ngOnInit(): void {
    this.minDate = new Date(this.data.borrowStartDate);
    this.maxDate = new Date(this.data.borrowEndDate);

    this.borrowForm = this.formBuilder.group({
      borrowStartDate: [null, Validators.required],
      borrowEndDate: [null, Validators.required],
    });
    this.billForm = this.formBuilder.group({
      billLastName: [null, Validators.required],
      billFirstName: [null, Validators.required],
      billCellPhone: [null, Validators.required],
      cardId: [null, Validators.required],
      safeCode: [null, Validators.required],
      expireYear: [null, Validators.required],
      expireMonth: [null, Validators.required],
      billZipCode: [null, Validators.required],
      billAddress: [null, Validators.required],
      billCountry: [null, Validators.required],
      billCity: [null, Validators.required],
    });

    this.getUserInfo();
  }

  intRange(start: number, end: number): number[] {
    const range = [...Array(end + 1).keys()];
    return range.slice(start, end + 1);
  }

  getUserInfo(): void {
    this.userService.getUser().subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        this.user = res.data;
        this.updateFormValue(this.user);
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  updateFormValue(data: User): void {
    this.billForm.patchValue({
      billLastName: data.lastName,
      billFirstName: data.firstName,
      billCellPhone: data.cellPhone,
      billAddress: data.address,
    });
  }

  dateFormatter(value: Date): string {
    const date = new Date(value as Date);
    return moment(date).format('YYYY/MM/DD hh:mm');
  }

  onSubmit(): void {
    const data = {
      productGroupId: this.data.id,
      borrowStartDate: this.dateFormatter(
        this.borrowForm.value.borrowStartDate
      ),
      borrowEndDate: this.dateFormatter(this.borrowForm.value.borrowEndDate),
      renterCreditCard: {
        ...this.billForm.value,
      },
    };

    this.rentalService.addRental(data).subscribe(
      (res: ApiModel<{ id: number }>) => {
        this.snakeBarService.open(res.message);
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }
}
