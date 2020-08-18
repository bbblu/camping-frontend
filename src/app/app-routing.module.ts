import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserInfoComponent } from './user-info/user-info.component';
import { FAQComponent } from './FAQ/FAQ.component';


const routes: Routes = [
  { path: 'user-info', component: UserInfoComponent },
  { path: 'FAQ', component: FAQComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
