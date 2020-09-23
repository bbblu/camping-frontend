import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';

export interface DialogData {
  croppedImages: string[];
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
    this.croppedImages[this.currentIndex] = event.base64 || '';
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
