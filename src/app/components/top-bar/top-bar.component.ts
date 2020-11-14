import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthService } from '@services/auth.service';
import { AccountService } from '@services/account.service';
import { SpinnerService } from '@services/ui/spinner.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  isAuth$!: Observable<boolean>;
  account$!: Observable<string>;
  showSpinner$!: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.isAuth$ = this.authService.isAuth$;
    this.account$ = this.accountService.account$;
    this.showSpinner$ = this.spinnerService.isShow$;
  }
}
