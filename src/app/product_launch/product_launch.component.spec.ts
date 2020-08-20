/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Product_launchComponent } from './product_launch.component';

describe('Product_launchComponent', () => {
  let component: Product_launchComponent;
  let fixture: ComponentFixture<Product_launchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Product_launchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Product_launchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
