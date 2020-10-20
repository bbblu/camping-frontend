import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { FaqDialogComponent } from '../faq-dialog/faq-dialog.component';

import { faqs } from '../../../fixtures/faq.fixture';

@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.scss'],
})
export class FaqListComponent implements OnInit {
  faqs = faqs;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(): void {
    this.dialog.open(FaqDialogComponent, {
      width: '70%',
      height: '50%',
    });
  }
}
