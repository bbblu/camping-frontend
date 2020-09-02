import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ApiModel } from '../models/api-model';
import { User } from '../models/user';
import { Experience } from '../models/experience';

import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  editable = false;

  user!: User;
  experiences: Experience[] = [];
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.getExperienceList();
    this.getUserInfo();

    this.form = this.formBuilder.group({
      account: [null],
      experience: [null],
    });
  }

  changeEditable(): void {
    this.editable = !this.editable;

    if (this.editable) {
      this.form.enable();
    } else {
      this.form.disable();
    }
  }

  getExperienceList(): void {
    this.httpService.getData<Experience[]>('/user/experience')
      .subscribe((response: ApiModel<Experience[]>) => {
        this.experiences = response.data;
      }, error => {
        console.log(error.error);
      });
  }

  getUserInfo(): void {
    this.httpService.getData<User>('/user')
      .subscribe((response: ApiModel<User>) => {
        this.user = response.data;
      }, error => {
        console.log(error.error);
      });
  }

}
