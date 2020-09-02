import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiModel } from '../models/api-model';
import { Experience } from '../models/experience';

import { HttpService } from '../services/http.service';
import { SnakeBarService } from './../services/snake-bar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  experiences!: Experience[];
  isPasswordHide = true;
  isConfimPasswordHide = true;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private snakeBarService: SnakeBarService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getExperienceList();

    this.registerForm = this.formBuilder.group({
      account: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9-_]+')]],
      password: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9-_]+')]],
      confirmPassword: [null, { validator: this.checkPassword }],
      email: [null, [Validators.required]],
      address: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      nickName: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      birthday: [null, [Validators.required]],
      experience: [null, [Validators.required]],
    });
  }

  checkPassword(group: FormGroup): object | null {
    const password = group.get('password')!.value;
    const confirmPassword = group.get('confirmPassword')!.value;

    return password === confirmPassword ? null : { notSame: true };
  }

  getExperienceList(): void {
    this.httpService.getData<Experience[]>('/user/experience')
      .subscribe((response: ApiModel<Experience[]>) => {
        this.experiences = response.data;
      }, error => {
        console.log(error.error);
      });
  }

  onSubmit(): void {
    const birthday = this.registerForm.value.birthday as Date;
    const formatBirthday = Intl.DateTimeFormat('zh-TW').format(birthday);
    this.httpService.postData<string>('/user', {
      ...this.registerForm.value,
      birthday: formatBirthday,
    })
      .subscribe((res: ApiModel<string>) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
          return;
        }

        this.router.navigate(['']);
      }, err => {
        this.snakeBarService.open(err.error.message);
      });
  }

}
