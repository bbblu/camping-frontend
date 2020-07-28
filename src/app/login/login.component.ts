import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = new FormGroup({
    accountnumber: new FormControl(''),
    password: new FormControl('')
  })

  constructor() { }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    window.alert('submited');
  }

  ngOnInit() {
  }

}
