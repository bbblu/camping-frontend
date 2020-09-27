import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@modules/material.module';

import { FaqRoutingModule } from './faq-routing.module';

import { FaqListComponent } from './faq-list/faq-list.component';
import { FaqDialogComponent } from './faq-dialog/faq-dialog.component';

@NgModule({
  declarations: [FaqListComponent, FaqDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FaqRoutingModule,
    FlexLayoutModule,
    MaterialModule,
  ],
})
export class FaqModule {}
