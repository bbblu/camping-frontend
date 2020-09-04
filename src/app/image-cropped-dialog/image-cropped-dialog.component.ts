import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';

export interface DialogData {
  croppedImageBase64: string;
}


@Component({
  selector: 'app-image-cropped-dialog',
  templateUrl: './image-cropped-dialog.component.html',
  styleUrls: ['./image-cropped-dialog.component.scss']
})
export class ImageCroppedDialogComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded(): void {
    // show cropper
  }
  cropperReady(): void {
    // cropper ready
  }
  loadImageFailed(): void {
    // show message
  }

  constructor(
    public dialogRef: MatDialogRef<ImageCroppedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
