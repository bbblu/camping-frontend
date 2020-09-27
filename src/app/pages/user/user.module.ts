import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    UserRoutingModule,
    MaterialModule,
    BorrowModule,
    ProductModule,
  ],
})
export class UserModule {}
