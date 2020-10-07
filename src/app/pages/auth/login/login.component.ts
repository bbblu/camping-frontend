import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { MatCheckboxChange } from '@angular/material/checkbox';

import { ApiModel } from '@models/api-model';

import { UserService } from '@services/api/user.service';
import { AuthService } from '@services/auth.service';
import { RememberMeService } from '@services/remember-me.service';
import { SnakeBarService } from '@services/ui/snake-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userForm!: FormGroup;
  isVisibility = true;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private rememberMeService: RememberMeService,
    private snakeBarService: SnakeBarService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      account: [
        null,
        [Validators.required, Validators.pattern('^[a-zA-Z0-9-_]+')],
      ],
      password: [
        null,
        [Validators.required, Validators.pattern('^[a-zA-Z0-9-_]+')],
      ],
    });

    if (this.rememberMeService.checkRememberMe()) {
      this.userForm.patchValue({
        account: this.rememberMeService.getAccount(),
      });
    }
  }

  changeRememberMe(e: MatCheckboxChange): void {
    this.rememberMeService.setRememberMe(e.checked);
  }

  onSubmit(): void {
    if (this.rememberMeService.getRememberMe()) {
      this.rememberMeService.setAccount(this.userForm.value.account);
    }

    this.userService.login(this.userForm.value).subscribe(
      (response: HttpResponse<ApiModel<object>>) => {
        const result = response.headers.get('X-Auth-Token') || '';
        if (result) {
          this.authService.setToken(result);
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
}
