import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { ShareModule } from './module/share.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { FAQComponent } from './FAQ/FAQ.component';
import { FAQDialogComponent } from './FAQ-dialog/FAQ-dialog.component';
import { ProductListComponent } from './product-list/product-list.component';
import { UserComponent } from './user/user.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { BorrowDialogComponent } from './borrow-dialog/borrow-dialog.component';

@NgModule({
   declarations: [
      AppComponent,
      TopBarComponent,
      LoginComponent,
      RegisterComponent,
    ProductDetailComponent,
    UserComponent,
      UserInfoComponent,
      FAQComponent,
      FAQDialogComponent,
      ProductListComponent,
      BorrowDialogComponent,
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      HttpClientModule,
      FlexLayoutModule,
      AppRoutingModule,
      ShareModule,
      NgxPaginationModule,

      JwtModule.forRoot({
        config: {
          tokenGetter: () => {
            return localStorage.getItem('access_token');
          },
          allowedDomains: ['211.75.1.201:50004']
        }
      })
   ], providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
