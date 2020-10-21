import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

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
export class UserInfoComponent implements OnInit, OnDestroy {
  user$!: Observable<User>;
  experiences$!: Observable<Experience[]>;
  form!: FormGroup;
  isEditable = false;

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snakeBarService: SnakeBarService
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getUserInfo(): void {
    this.user$ = this.userService.getUser().pipe(
      takeUntil(this.destroy$),
      map((res) => res.data),
      tap((data) => this.updateFormValue(data))
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
    this.experiences$ = this.userService.getUserExperiences().pipe(
      takeUntil(this.destroy$),
      map((res) => res.data)
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
