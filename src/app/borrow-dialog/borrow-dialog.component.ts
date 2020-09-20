import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { ApiModel } from '../models/api-model';
import { User } from '../models/user';
import { ProductGroup } from '../models/product-group-detail';

import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-borrow-dialog',
  templateUrl: './borrow-dialog.component.html',
  styleUrls: ['./borrow-dialog.component.scss']
})
export class BorrowDialogComponent implements OnInit {
  isLinear = false;
  firstForm!: FormGroup;
  secondForm!: FormGroup;
  user!: User;
  productGroup!: ProductGroup;
  selectFormControl = new FormControl('', Validators.required);

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

    this.firstForm = this.formBuilder.group({
      borrowLastName: [null, Validators.required],
      borrowFirstName: [null, Validators.required],
      billEmail: [null, Validators.required],
      billCellPhone: [null, Validators.required],
    });
    this.secondForm = this.formBuilder.group({
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

        this.firstForm.patchValue({
          borrowLastName: this.user.lastName,
          borrowFirstName: this.user.firstName,
          billEmail: this.user.email,
        });
        this.secondForm.patchValue({
          billLastName: this.user.lastName,
          billFirstName: this.user.firstName,
          billAddress: this.user.address,
        });
      }, error => {
        console.log(error.error);
      });
  }

  onSubmit(): void {
    console.log(this.firstForm.value);
    console.log(this.secondForm.value);
  }

}
