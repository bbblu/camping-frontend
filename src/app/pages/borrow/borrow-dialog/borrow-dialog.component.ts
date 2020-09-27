import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';

import { ApiModel } from '@models/api-model';
import { User } from '@models/user/user.model';
import { ProductGroup } from '@models/product/product.model';

import { RentalService } from '@services/api/rental.service';
import { UserService } from '@services/api/user.service';

@Component({
  selector: 'app-borrow-dialog',
  templateUrl: './borrow-dialog.component.html',
  styleUrls: ['./borrow-dialog.component.scss'],
})
export class BorrowDialogComponent implements OnInit {
  minDate!: Date;
  maxDate!: Date;

  borrowForm!: FormGroup;
  userForm!: FormGroup;
  billForm!: FormGroup;

  user!: User;
  rental!: { id: string };

  constructor(
    public dialogRef: MatDialogRef<BorrowDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductGroup,
    private formBuilder: FormBuilder,
    private rentalService: RentalService,
    private userService: UserService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getUserInfo();

    this.minDate = new Date(this.data.borrowDateRange.slice(0, 11));
    this.maxDate = new Date(this.data.borrowDateRange.slice(19, 29));

    this.borrowForm = this.formBuilder.group({
      borrowStartDate: [null, Validators.required],
      borrowEndDate: [null, Validators.required],
    });
    this.userForm = this.formBuilder.group({
      borrowLastName: [null, Validators.required],
      borrowFirstName: [null, Validators.required],
      billCellPhone: [null, Validators.required],
    });
    this.billForm = this.formBuilder.group({
      billLastName: [null, Validators.required],
      billFirstName: [null, Validators.required],
      cardId: [null, Validators.required],
      safeCode: [null, Validators.required],
      expireDate: [null, Validators.required],
      billAddress: [null, Validators.required],
      billCountry: ['台灣', Validators.required],
      billCity: [null, Validators.required],
    });
  }

  intRange(start: number, end: number): number[] {
    const range = [...Array(end + 1).keys()];
    return range.slice(start, end + 1);
  }

  getUserInfo(): void {
    this.userService.getUser().subscribe(
      (response: ApiModel<User>) => {
        this.user = response.data;

        this.userForm.patchValue({
          borrowLastName: this.user.lastName,
          borrowFirstName: this.user.firstName,
          billEmail: this.user.email,
        });
        this.billForm.patchValue({
          billLastName: this.user.lastName,
          billFirstName: this.user.firstName,
          billAddress: this.user.address,
        });
      },
      (error) => {
        console.log(error.error);
      }
    );
  }

  dateFormatter(value: Date): string {
    const date = new Date(value as Date);
    return moment(date).format('YYYY/MM/DD hh:mm');
  }

  onSubmit(): void {
    const data = {
      productGroupId: this.data.id,
      renterCreditCard: {
        ...this.userForm.value,
        ...this.billForm.value,
      },
      renterContactInformationId: 1,
      borrowStartDate: this.dateFormatter(
        this.borrowForm.value.borrowStartDate
      ),
      borrowEndDate: this.dateFormatter(this.borrowForm.value.borrowEndDate),
      campId: 1,
    };

    this.rentalService.addRental(data).subscribe(
      (res: ApiModel<{ id: string }>) => {
        this.rental = res.data;
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
