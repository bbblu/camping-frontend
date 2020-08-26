import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-FAQ-dialog',
  templateUrl: './FAQ-dialog.component.html',
  styleUrls: ['./FAQ-dialog.component.scss']
})
export class FAQDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FAQDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit() {
  }

}
