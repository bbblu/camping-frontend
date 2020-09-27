import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ApiModel } from '@models/api-model';
import { User } from '@models/user/user.model';
import { Experience } from '@models/user/experience.model';

import { UserService } from '@services/api/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  user!: User;
  experiences: Experience[] = [];
  form!: FormGroup;
  isEditable = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

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
    this.userService.getUser().subscribe(
      (res: ApiModel<User>) => {
        this.user = res.data;
        this.updateFormValue(res.data);
      },
      (err) => {
        console.error(err);
      }
    );
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
    this.userService.getUserExperiences().subscribe(
      (response: ApiModel<Experience[]>) => {
        this.experiences = response.data;
      },
      (error) => {
        console.log(error.error);
      }
    );
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
    this.userService.updateUser(this.form.value).subscribe(
      (res: ApiModel<string>) => {
        console.log(res.message);
      },
      (err) => {
        console.error(err.error);
      }
    );
  }
}
