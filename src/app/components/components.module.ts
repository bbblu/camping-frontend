import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopBarComponent } from './top-bar/top-bar.component';
import { ImageCropperDialogComponent } from './image-cropper-dialog/image-cropper-dialog.component';

@NgModule({
  declarations: [TopBarComponent, ImageCropperDialogComponent],
  imports: [CommonModule],
  exports: [TopBarComponent, ImageCropperDialogComponent],
})
export class ComponentsModule {}
