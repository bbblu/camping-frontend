import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { ApiModel } from '../models/api-model';

import { HttpService } from '../services/http.service';
import { AuthService } from './../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm!: FormGroup;
  isVisibility = true;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      account: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9-_]+')]],
      password: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9-_]+')]]
    });
  }

  onSubmit(): void {
    this.httpService.postData<object>('/login', this.userForm.value)
      // @ts-ignore
      .subscribe((response: HttpResponse<ApiModel<object>>) => {
        const result = response.headers.get('X-Auth-Token') || '';
        if (result) {
          this.authService.setToken(result);
          this.router.navigate(['']);
        }
      }, err => {
        alert(err.error.message);
      });
  }

}
