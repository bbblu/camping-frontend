import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

import { ApiModel } from '../models/api-model';
import { User } from '../models/user';
import { ProductGroup } from '../models/product';
import { Rental } from '@models/rental/rental';

import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-borrow-dialog',
  templateUrl: './borrow-dialog.component.html',
  styleUrls: ['./borrow-dialog.component.scss']
})
export class BorrowDialogComponent implements OnInit {
  minDate!: Date;
  maxDate!: Date;

  borrowForm!: FormGroup;
  userForm!: FormGroup;
  billForm!: FormGroup;

  user!: User;
  productGroup!: ProductGroup;
  rental!: Rental;

  constructor(
    public dialogRef: MatDialogRef<BorrowDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductGroup,
    private formBuilder: FormBuilder,
    private httpService: HttpService,
  ) { }

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
    this.httpService.getData<User>('/user')
      .subscribe((response: ApiModel<User>) => {
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
      }, error => {
        console.log(error.error);
      });
  }

  getRental(): void {
    this.httpService.getData<Rental>('/rental')
      .subscribe((res: ApiModel<Rental>) => {
        this.rental = res.data;
      }, err => {
        console.error(err);
      });
  }

  dateFormater(value: Date): string {
    const date = new Date(value as Date);
    return moment(date).format('YYYY/MM/DD hh:mm');;
  }

  onSubmit(): void {
    const data = {
      productGroupId: this.data.id,
      renterCreditCard: {
        ...this.userForm.value,
        ...this.billForm.value,
      },
      renterContactInformationId: 1,
      borrowStartDate: this.dateFormater(this.borrowForm.value.borrowStartDate),
      borrowEndDate: this.dateFormater(this.borrowForm.value.borrowEndDate),
      campId: 1,
    }

    this.httpService.postData<{ id: string }>('/rental', data)
      .subscribe((res: ApiModel<Rental>) => {
        this.rental = res.data;
      }, err => {
        console.error(err);
      });
  }
}
