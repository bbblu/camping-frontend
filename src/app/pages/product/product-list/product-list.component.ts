import { Component, Input, OnInit } from '@angular/core';

import { ProductGroup } from '@models/product/product-group.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Input() productGroups: ProductGroup[] = [];
  @Input() isEdit = false;

  page = 1;

  constructor() {}

  ngOnInit(): void {}
}
