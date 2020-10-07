import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { SpinnerService } from '@services/ui/spinner.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  showSpinner$!: Observable<boolean>;

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit(): void {
    this.showSpinner$ = this.spinnerService.isShow$;
  }
}
