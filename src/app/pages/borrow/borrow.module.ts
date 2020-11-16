import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@modules/material.module';
import { NgImageSliderModule } from 'ng-image-slider';

import { BorrowRoutingModule } from './borrow-routing.module';

import { BorrowListComponent } from './borrow-list/borrow-list.component';
import { BorrowDialogComponent } from './borrow-dialog/borrow-dialog.component';
import { BorrowActionDialogComponent } from './borrow-action-dialog/borrow-action-dialog.component';
import { BorrowCommentDialogComponent } from './borrow-comment-dialog/borrow-comment-dialog.component';

@NgModule({
  declarations: [
    BorrowListComponent,
    BorrowDialogComponent,
    BorrowActionDialogComponent,
    BorrowCommentDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BorrowRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    NgImageSliderModule,
  ],
  exports: [BorrowListComponent],
})
export class BorrowModule {}
