import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthService } from '@services/auth.service';
import { SpinnerService } from '@services/ui/spinner.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  isAuth$!: Observable<boolean>;
  showSpinner$!: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.isAuth$ = this.authService.isAuth$;
    this.showSpinner$ = this.spinnerService.isShow$;
  }
}
