import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  searchForm!: FormGroup;
  dist = new FormControl();
  collection = [];
  distList: string[] = ['松山區', '大安區', '古亭區', '雙園區', '龍山區', '城中區'];

  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = false;

  separatorKeysCodes = [ENTER, COMMA];

  CampingSuppliesCtrl = new FormControl();

  filteredCampingSuppliess: Observable<any[]>;

  CampingSuppliess: string[] = [];

  allCampingSuppliess = [
    '桌子',
    '椅子',
    '帳篷',
  ];

  @ViewChild('CampingSuppliesInput')
  CampingSuppliesInput!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.filteredCampingSuppliess = this.CampingSuppliesCtrl.valueChanges.pipe(
      startWith(null),
      map((CampingSupplies: string | null) => CampingSupplies ? this.filter(CampingSupplies) : this.allCampingSuppliess.slice()));
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our CampingSupplies
    if ((value || '').trim()) {
      this.CampingSuppliess.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.CampingSuppliesCtrl.setValue(null);
  }

  remove(CampingSupplies: any): void {
    const index = this.CampingSuppliess.indexOf(CampingSupplies);

    if (index >= 0) {
      this.CampingSuppliess.splice(index, 1);
    }
  }

  filter(name: string) {
    return this.allCampingSuppliess.filter(CampingSupplies =>
      CampingSupplies.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.CampingSuppliess.push(event.option.viewValue);
    this.CampingSuppliesInput.nativeElement.value = '';
    this.CampingSuppliesCtrl.setValue(null);
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
    });
  }


}

