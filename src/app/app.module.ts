import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ShareModule } from './module/share.module';
import { FAQComponent } from './FAQ/FAQ.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import { FAQDialogComponent } from './FAQ-dialog/FAQ-dialog.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
   declarations: [
      AppComponent,
      RegisterComponent,
      LoginComponent,
      TopBarComponent,
      NavbarComponent,
      UserInfoComponent,
      FAQComponent,
      FAQDialogComponent,
   ],
   imports: [
       
      BrowserModule,
      AppRoutingModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      FlexLayoutModule,
      ShareModule,
      MatExpansionModule,
      MatDialogModule
   ],
   
   
   exports: [
      MatToolbarModule,
      MatCardModule,
      MatButtonModule,
      MatCheckboxModule,
      MatFormFieldModule,
      MatInputModule,
      ReactiveFormsModule
   providers: [],
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
