import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';// 引入表單模塊

// Angular Material Module List
// Form Controls
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatSelectModule } from '@angular/material/select';
// Buttons 
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
// Expansion Panels
import { MatExpansionModule } from '@angular/material/expansion';
// 圖片裁切器
import { ImageCropperModule } from 'ngx-image-cropper';
import { ProductCreateComponent } from './product-create/product-create.component';



@NgModule({
   declarations: [
      AppComponent,
      RegisterComponent,
      LoginComponent,
      ProductCreateComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      MatAutocompleteModule,
      MatCheckboxModule,
      MatDatepickerModule,
      MatFormFieldModule,
      MatInputModule,
      MatRadioModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatMomentDateModule,
      MatSelectModule,
      FlexLayoutModule,
      HttpClientModule,
      MatExpansionModule,
      ImageCropperModule,
   ],
   exports: [
      MatToolbarModule,
      MatCardModule,
      MatSelectModule,
      MatButtonModule,
      MatFormFieldModule,
      MatCheckboxModule,
      MatInputModule,
      ReactiveFormsModule,
      MatExpansionModule,
      ImageCropperModule,
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
