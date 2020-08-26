import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { ShareModule } from './module/share.module';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { FAQComponent } from './FAQ/FAQ.component';
import { FAQDialogComponent } from './FAQ-dialog/FAQ-dialog.component';

@NgModule({
   declarations: [
      AppComponent,
      TopBarComponent,
      LoginComponent,
      RegisterComponent,
      NavbarComponent,
      UserInfoComponent,
      FAQComponent,
      FAQDialogComponent,
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      HttpClientModule,
      FlexLayoutModule,
      AppRoutingModule,
      ShareModule,
   ],
   exports: [
      ReactiveFormsModule
   ], providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
