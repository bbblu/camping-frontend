import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatChipInputEvent } from '@angular/material/chips';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import * as moment from 'moment';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { ProductGroup } from '@models/product/product-group.model';
import { ProductType } from '@models/product/product-group-filter.model';
import { City } from '@models/city/city.model';

import { ProductService } from '@services/api/product.service';
import { CityService } from '@services/api/city.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  @ViewChild('typeInput') typeInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;

  form!: FormGroup;
  productTypes$ = new BehaviorSubject<ProductType[]>([]);
  city$!: Observable<City>;
  productGroups$!: Observable<ProductGroup[]>;

  chipTypes: ProductType[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  page = 1;

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private cityService: CityService
  ) {}

  ngOnInit(): void {
    this.getProductTypeData();
    this.getCityData();
    this.getProductGroupData();

    this.form = this.formBuilder.group({
      borrowStartDate: [null],
      borrowEndDate: [null],
      cityAreaName: [null],
      typeArray: [[]],
      priceRange: [null],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getProductTypeData() {
    this.productService
      .getProductTypes()
      .pipe(
        takeUntil(this.destroy$),
        map((res) => this.productTypes$.next(res.data))
      )
      .subscribe();
  }

  getCityData(): void {
    this.city$ = this.cityService.getCities().pipe(
      takeUntil(this.destroy$),
      map((res) => res.data)
    );
  }

  getProductGroupData(params: string = ''): void {
    this.productGroups$ = this.productService.getProductGroups(params).pipe(
      takeUntil(this.destroy$),
      map((res) => res.data)
    );
  }

  addType(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    const findType = this.productTypes$.value.find(
      (item) => item.name === value.trim()
    );

    if (findType) {
      this.form.value.typeArray.push(findType.id);
      this.chipTypes.push(findType);
    }

    if (input) {
      input.value = '';
    }
  }

  removeType(type: ProductType): void {
    const index = this.productTypes$.value.indexOf(type);

    if (index >= 0) {
      this.form.value.typeArray.splice(index, 1);
      this.chipTypes.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const findType = this.productTypes$.value.find(
      (item) => item.name === event.option.viewValue.trim()
    );

    if (findType) {
      this.form.value.typeArray.push(findType.id);
      this.chipTypes.push(findType);
    }

    this.typeInput.nativeElement.value = '';
  }

  onSubmit(): void {
    let params = '';

    for (let [key, value] of Object.entries(this.form.value)) {
      if (!value || (value instanceof Array && value.length === 0)) {
        continue;
      }

      if (value instanceof Date) {
        const date = new Date(value as Date);
        value = moment(date).format('YYYY/MM/DD');
      }

      params += `${key}=${value}&`;
    }

    this.getProductGroupData(params);
  }
}
