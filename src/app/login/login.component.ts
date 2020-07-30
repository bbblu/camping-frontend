import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder,Validators} from '@angular/forms';
import { get } from 'selenium-webdriver/http';

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
  
  /*
  public form: FormGroup;
  constructor(
    private fb: FormBuilder
  ){}
  */
  
  onSubmit() {
    // TODO: Use EventEmitter with form value
    
  }
  

  ngOnInit() {
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
