import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductListComponent } from './product-list/product-list.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { FAQComponent } from './FAQ/FAQ.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'user-info', component: UserInfoComponent, canActivate: [AuthGuard] },
  { path: 'FAQ', component: FAQComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
