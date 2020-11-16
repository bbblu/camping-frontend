import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@guards/auth.guard';

import { UserComponent } from './user.component';
import { UserProductComponent } from './user-product/user-product.component';

const routes: Routes = [
  { path: '', component: UserComponent, canActivate: [AuthGuard] },
  { path: ':account/product', component: UserProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
