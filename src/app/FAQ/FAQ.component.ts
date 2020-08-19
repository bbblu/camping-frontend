import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-FAQ',
  templateUrl: './FAQ.component.html',
  styleUrls: ['./FAQ.component.scss']
})
export class FAQComponent implements OnInit {
  panelOpenState = false;

  constructor() { }

  ngOnInit() {
  }

}
