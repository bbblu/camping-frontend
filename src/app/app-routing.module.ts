import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { UserComponent } from './user/user.component';
import { FAQComponent } from './FAQ/FAQ.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'product', component: ProductListComponent },
  { path: 'product/add' , component: ProductCreateComponent, canActivate: [AuthGuard] },
  { path: 'product-create' , component: ProductCreateComponent },
  { path: 'product/:id', component: ProductDetailComponent },

  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'faq', component: FAQComponent },

  { path: '', redirectTo: '/product', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
