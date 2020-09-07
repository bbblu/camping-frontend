import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { base64ToFile } from 'ngx-image-cropper';

export interface DialogData {
  croppedImageBase64: string;
}


@Component({
  selector: 'app-image-cropped-dialog',
  templateUrl: './image-cropped-dialog.component.html',
  styleUrls: ['./image-cropped-dialog.component.scss']
})
export class ImageCroppedDialogComponent implements OnInit {

  imageChangedEvent!: Event;
  croppedImages: string[] = [];
  currentIndex = 0;

  constructor(
    public dialogRef: MatDialogRef<ImageCroppedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
  }

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent): void {
    const croppedImage = event.base64 || '';
    this.croppedImages[this.currentIndex] = croppedImage;
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

  changeCurrentIndex(index: number): void {
    this.currentIndex = index;
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
