import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { ApiModel } from '../models/api-model';
import { User } from '../models/user';
import { ProductGroup } from '../models/product';

import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-borrow-dialog',
  templateUrl: './borrow-dialog.component.html',
  styleUrls: ['./borrow-dialog.component.scss']
})
export class BorrowDialogComponent implements OnInit {
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  user!: User;
  // productGroup!: ProductGroup;
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

    this.firstFormGroup = this.formBuilder.group({
      billLastName: [null, Validators.required],
      billFirstName: [null, Validators.required],
      billEmail: [null, Validators.required],
      billCellPhone: [null, Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      billLastName: [null, Validators.required],
      billFirstName: [null, Validators.required],
      cardId: [null, Validators.required],
      safeCode: [null, Validators.required],
      expireDate: [null, Validators.required],
      billAddress: [null, Validators.required],
      selectFormControl: [null, Validators.required],
    });
  }

  getUserInfo(): void {
    this.httpService.getData<User>('/user')
      .subscribe((response: ApiModel<User>) => {
        this.user = response.data;

        this.firstFormGroup.patchValue({
          billLastName: this.user.lastName,
          billFirstName: this.user.firstName,
          billEmail: this.user.email,
        });
        this.secondFormGroup.patchValue({
          billLastName: this.user.lastName,
          billFirstName: this.user.firstName,
          billAddress: this.user.address,
        });
      }, error => {
        console.log(error.error);
      });
  }

}
