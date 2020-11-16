import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ProductService } from '@services/api/product.service';
import { SnakeBarService } from '@services/ui/snake-bar.service';

interface BorrowCommentDialogData {
  title: string;
  productGroupId: number;
}

@Component({
  selector: 'app-borrow-comment-dialog',
  templateUrl: './borrow-comment-dialog.component.html',
  styleUrls: ['./borrow-comment-dialog.component.scss'],
})
export class BorrowCommentDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private snakeBarService: SnakeBarService,
    private dialogRef: MatDialogRef<BorrowCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BorrowCommentDialogData
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      comment: [5, Validators.required],
    });
  }

  onSubmit(): void {
    this.productService
      .addProductGroupComment(this.data.productGroupId, this.form.value)
      .subscribe(
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
