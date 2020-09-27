import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@modules/material.module';

import { UserRoutingModule } from './user-routing.module';

import { UserInfoComponent } from './user-info/user-info.component';
import { UserComponent } from './user.component';
import { BorrowModule } from '@pages/borrow/borrow.module';
import { ProductModule } from '@pages/product/product.module';

@NgModule({
  declarations: [UserInfoComponent, UserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    BorrowModule,
    ProductModule,
  ],
})
export class UserModule {}
