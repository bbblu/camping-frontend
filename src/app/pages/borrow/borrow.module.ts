import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@modules/material.module';

import { BorrowRoutingModule } from './borrow-routing.module';

import { BorrowListComponent } from './borrow-list/borrow-list.component';
import { BorrowDialogComponent } from './borrow-dialog/borrow-dialog.component';

@NgModule({
  declarations: [BorrowListComponent, BorrowDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BorrowRoutingModule,
    MaterialModule,
  ],
  exports: [BorrowListComponent],
})
export class BorrowModule {}
