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

  user!: User;
  experiences: Experience[] = [];
  form!: FormGroup;
  isEditable = false;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.getExperienceList();
    this.getUserInfo();

    this.form = this.formBuilder.group({
      nickName: [null],
      experience: [null],
      email: [null],
      address: [null],
    });
    this.form.disable();
  }

  getUserInfo(): void {
    this.httpService.getData<User>('/user')
      .subscribe((res: ApiModel<User>) => {
        this.user = res.data;
        this.updateFormValue(res.data);
      }, err => {
        console.error(err);
      });
  }

  updateFormValue(data: User): void {
    this.form.setValue({
      nickName: data.nickName,
      experience: data.experience.toString(),
      email: data.email,
      address: data.address,
    });
  }

  getExperienceList(): void {
    this.httpService.getData<Experience[]>('/user/experience')
      .subscribe((response: ApiModel<Experience[]>) => {
        this.experiences = response.data;
      }, error => {
        console.log(error.error);
      });
  }

  onEditClick(): void {
    this.isEditable = !this.isEditable;
    if (this.isEditable) {
      this.form.enable();
    } else {
      this.form.disable();
    }
  }

  onSubmit(): void {
    this.httpService.patchData<string>('/user', this.form.value)
      .subscribe((res: ApiModel<string>) => {
        console.log(res.message);
      }, err => {
        console.error(err.error);
      });
  }

}
