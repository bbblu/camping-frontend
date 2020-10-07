import { Component, OnInit } from '@angular/core';

import { SpinnerService } from '@services/ui/spinner.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  showSpinner = false;

  constructor(public spinnerService: SpinnerService) {}

  ngOnInit(): void {}
}
