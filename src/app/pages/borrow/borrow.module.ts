import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BorrowRoutingModule } from './borrow-routing.module';
import { BorrowListComponent } from './borrow-list/borrow-list.component';
import { BorrowDialogComponent } from './borrow-dialog/borrow-dialog.component';

@NgModule({
  declarations: [BorrowListComponent, BorrowDialogComponent],
  imports: [
    CommonModule,
    BorrowRoutingModule
  ]
})
export class BorrowModule { }
