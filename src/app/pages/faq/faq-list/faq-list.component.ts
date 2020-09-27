import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { FaqDialogComponent } from '../faq-dialog/faq-dialog.component';

@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.scss'],
})
export class FaqListComponent implements OnInit {
  panelOpenState = false;
  name = 'name';

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(FaqDialogComponent, {
      width: '70%',
      height: '50%',
      data: { name: this.name },
    });
  }
}
