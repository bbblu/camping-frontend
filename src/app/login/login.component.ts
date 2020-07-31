import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ApiModel } from '../models/api-model'
import { HttpService } from '../services/http.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm!: FormGroup;
  result!: ApiModel<object>;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private httpSerivce: HttpService
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      account: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9-_]*')]],
      password: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9-_]*')]]
    });
  }
  onSubmit() {
    console.log(this.userForm.value);
    this.httpSerivce.postData<object>('/login',this.userForm.value)
      .subscribe(response =>{
        this.result = response;
      });

  }


}
