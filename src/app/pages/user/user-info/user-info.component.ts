import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ApiModel } from '@models/api-model';
import { User } from '@models/user/user.model';
import { Experience } from '@models/user/experience.model';

import { UserService } from '@services/api/user.service';
import { SnakeBarService } from '@services/ui/snake-bar.service';

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
    private userService: UserService,
    private snakeBarService: SnakeBarService
  ) {}

  ngOnInit(): void {
    this.getExperiences();
    this.getUserInfo();

    this.form = this.formBuilder.group({
      nickName: [null],
      experience: [null],
      email: [null],
      cellPhone: [null],
      address: [null],
    });
    this.form.disable();
  }

  getUserInfo(): void {
    this.userService.getUser().subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        this.user = res.data;
        this.updateFormValue(this.user);
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }

  updateFormValue(data: User): void {
    this.form.setValue({
      nickName: data.nickName,
      experience: data.experience.toString(),
      email: data.email,
      cellPhone: data.cellPhone,
      address: data.address,
    });
  }

  getExperiences(): void {
    this.userService.getUserExperiences().subscribe(
      (res) => {
        if (!res.result) {
          this.snakeBarService.open(res.message);
        }

        this.experiences = res.data;
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
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
        this.snakeBarService.open(res.message);
      },
      (err) => {
        this.snakeBarService.open(err.error.message);
      }
    );
  }
}
