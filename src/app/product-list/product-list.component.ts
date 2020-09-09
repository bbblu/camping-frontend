import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { HttpService } from '../services/http.service';

import { ApiModel } from '../models/api-model';
import { City, ProductGroupFilter, Type } from '../models/product-group-filter';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  form!: FormGroup;
  productTypes: Type[] = [];
  city!: City;

  chipTypes: Type[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('typeInput') typeInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
  ) {
  }

  ngOnInit(): void {
    this.getCityData();

    this.form = this.formBuilder.group({
      borrowStartDate: [null],
      borrowEndDate: [null],
      cityAreaName: [null],
      typeArray: [[]],
      priceRange: [null],
    });
  }

  getCityData(): void {
    this.httpService.getData<ProductGroupFilter>('/product-group/filter')
      .subscribe((response: ApiModel<ProductGroupFilter>) => {
        this.productTypes = response.data.type;
        this.city = response.data.city;
      });
  }

  addType(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    const findType = this.productTypes.find(item => item.name === value.trim());

    if (findType) {
      this.form.value.typeArray.push(findType.id);
      this.chipTypes.push(findType);
    }

    if (input) {
      input.value = '';
    }
  }

  removeType(type: Type): void {
    const index = this.productTypes.indexOf(type);

    if (index >= 0) {
      this.form.value.typeArray.splice(index, 1);
      this.chipTypes.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const findType = this.productTypes.find(item => item.name === event.option.viewValue.trim());

    if (findType) {
      this.form.value.typeArray.push(findType.id);
      this.chipTypes.push(findType);
    }

    this.typeInput.nativeElement.value = '';
  }

  onSubmit(): void {
    let params = '';

    for (let [key, value] of Object.entries(this.form.value)) {
      if (!value || (Array.isArray(value) && value.length === 0)) {
        continue;
      }

      if (key.endsWith('Date')) {
        const date = new Date(value as Date);
        value = Intl.DateTimeFormat('zh-TW').format(date);
      }

      params += `${key}=${value}&`;
    }

    this.httpService.getData<Product>(`/product-group?${params}`)
      .subscribe((response: ApiModel<Product>) => {
        console.log(response);
      });
  }

}
