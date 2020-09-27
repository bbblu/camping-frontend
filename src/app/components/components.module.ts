import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@modules/material.module';
import { ImageCropperModule } from 'ngx-image-cropper';

import { TopBarComponent } from './top-bar/top-bar.component';
import { ImageCropperDialogComponent } from './image-cropper-dialog/image-cropper-dialog.component';

@NgModule({
  declarations: [TopBarComponent, ImageCropperDialogComponent],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    ImageCropperModule,
  ],
  exports: [TopBarComponent, ImageCropperDialogComponent],
})
export class ComponentsModule {}
