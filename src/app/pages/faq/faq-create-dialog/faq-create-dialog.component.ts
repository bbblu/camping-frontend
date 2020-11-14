import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

import { UserService } from '@services/api/user.service';
import { SnakeBarService } from '@services/ui/snake-bar.service';

@Component({
  selector: 'app-faq-create-dialog',
  templateUrl: './faq-create-dialog.component.html',
  styleUrls: ['./faq-create-dialog.component.scss'],
})
export class FaqCreateDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<FaqCreateDialogComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snakeBarService: SnakeBarService
  ) {}

  ngOnInit(): void {
    this.getUserInfo();

    this.form = this.formBuilder.group({
      title: [null, Validators.required],
      type: [null, Validators.required],
      email: [null, Validators.required],
      content: [null, Validators.required],
    });
  }

  getUserInfo(): void {
    this.userService.getUser().subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        this.form.patchValue({
          email: res.data.email,
        });
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  onSubmit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
