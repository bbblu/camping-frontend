import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@modules/material.module';

import { UserRoutingModule } from './user-routing.module';

import { UserInfoComponent } from './user-info/user-info.component';
import { UserProductComponent } from './user-product/user-product.component';
import { ProductModule } from '../product/product.module';

@NgModule({
  declarations: [
    UserInfoComponent,
    UserProductComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    ProductModule,
  ],
})
export class UserModule {}
