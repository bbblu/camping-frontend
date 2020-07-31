import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder,Validators} from '@angular/forms';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Response } from '../models//response'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = new FormGroup({
    account: new FormControl(''),
    password: new FormControl('')
  })
  
  
  constructor(
    private formBuilder: FormBuilder,
    private http :HttpClient
  ){}

  getAlertList(){
    let url = "http://localhost:3000/posts"

    this.http.get<any>(url).subscribe(res => {
      console.log(res);
    });
  }
  
  onSubmit() {
    // TODO: Use EventEmitter with form value
    
  }
  

  ngOnInit():void {
    this.userForm = this.formBuilder.group({
      
    })
    /*
    this.form = this.fb.group({
      username: ['',Validators.pattern('^[a-zA-Z0-9-_]{5,20}')],
      password: ['',Validators.pattern('^[a-zA-Z0-9-_]{5,20}')],
      rememberMe :[false]
    })
    */
  }
  /*
  get username() {return this.form.get('username');}
  get password() {return this.form.get('password');}
  get rememberMe() {return this.form.get('rememberMe');}

  login(){
  }
  */
}
