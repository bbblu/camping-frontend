import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@modules/material.module';

import { UserRoutingModule } from './user-routing.module';

import { UserComponent } from './user.component';
import { UserInfoComponent } from './user-info/user-info.component';

@NgModule({
  declarations: [UserComponent, UserInfoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    FlexLayoutModule,
    MaterialModule,
  ],
})
export class UserModule {}
