import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-borrow-list',
  templateUrl: './borrow-list.component.html',
  styleUrls: ['./borrow-list.component.scss'],
})
export class BorrowListComponent implements OnInit {
  isChecked = true;
  formGroup: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      enableWifi: '',
      acceptTerms: ['', Validators.requiredTrue],
    });
  }

  onFormSubmit(): void {
    alert(JSON.stringify(this.formGroup.value, null, 2));
  }

  ngOnInit(): void {}
}
