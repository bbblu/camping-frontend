import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';

import { ApiModel } from '@models/api-model';

import { UserService } from '@services/api/user.service';
import { AuthService } from '@services/auth.service';
import { AccountService } from '@services/account.service';
import { RememberMeService } from '@services/remember-me.service';
import { SnakeBarService } from '@services/ui/snake-bar.service';

import { ForgetPasswordDialogComponent } from '@pages/auth/forget-password-dialog/forget-password-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isVisibility = true;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private accountService: AccountService,
    private rememberMeService: RememberMeService,
    private snakeBarService: SnakeBarService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      account: [
        null,
        [Validators.required, Validators.pattern('^[a-zA-Z0-9-_]+')],
      ],
      password: [
        null,
        [Validators.required, Validators.pattern('^[a-zA-Z0-9-_]+')],
      ],
    });

    if (this.rememberMeService.isRememberMe) {
      this.form.patchValue({
        account: this.accountService.account,
      });
    }
  }

  changeRememberMe(e: MatCheckboxChange): void {
    this.rememberMeService.isRememberMe = e.checked;
  }

  onSubmit(): void {
    this.accountService.account = this.form.value.account;

    this.userService.login(this.form.value).subscribe(
      (res: HttpResponse<ApiModel<object>>) => {
        const result = res.headers.get('X-Auth-Token') || '';
        if (result) {
          this.authService.setToken(result);
          this.accountService.account = this.form.value.account;
          this.authService.isAuth = true;

          const redirectUrl = this.route.snapshot.queryParams['redirectUrl'];
          if (redirectUrl) {
            this.router
              .navigateByUrl(redirectUrl)
              .catch(() => this.router.navigate(['']));
          } else {
            this.router.navigate(['']);
          }
        }
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  openDialog(): void {
    this.dialog.open(ForgetPasswordDialogComponent, {
      width: window.screen.width <= 960 ? '100%' : '50%',
    });
  }
}
