import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';
import { FaqListComponent } from './faq-list/faq-list.component';
import { FaqDialogComponent } from './faq-dialog/faq-dialog.component';


@NgModule({
  declarations: [FaqListComponent, FaqDialogComponent],
  imports: [
    CommonModule,
    FaqRoutingModule
  ]
})
export class FaqModule { }
