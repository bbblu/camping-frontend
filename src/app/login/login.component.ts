import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiModel } from '../models/api-model';
import { HttpService } from '../services/http.service';
import { error } from 'selenium-webdriver';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  userForm!: FormGroup;
  result!: ApiModel<object>;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private httpSerivce: HttpService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      account: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9-_]*')]],
      password: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9-_]*')]]
    });
  }

  onSubmit() {
    console.log(this.userForm.value);
    this.httpSerivce.postData<object>('/login', this.userForm.value)
      .subscribe(response => {
        this.result = response;
        if (response.result) {
          this.router.navigateByUrl('/');
        }
      }, error => {
        alert(error.error.message);
      }
      );

  }


}
