import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FAQDialogComponent } from '../FAQ-dialog/FAQ-dialog.component'

@Component({
  selector: 'app-FAQ',
  templateUrl: './FAQ.component.html',
  styleUrls: ['./FAQ.component.scss']
})
export class FAQComponent implements OnInit {
  panelOpenState = false;
  animal: string = 'cat';
  name: string = 'name';

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FAQDialogComponent, {
      width: '70%',
      height:'50%',
      data: { name: this.name, animal: this.animal }
    });

  }
}


