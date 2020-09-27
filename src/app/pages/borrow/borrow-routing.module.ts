import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BorrowListComponent } from './borrow-list/borrow-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: BorrowListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BorrowRoutingModule {}
