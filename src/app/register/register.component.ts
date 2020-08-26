import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  imageSrc = 'assets/images/logo.png';
  imageAlt ='logo';
  registerForm = this.fb.group({
    account: ['', Validators.required],
    password: ['', Validators.required],
    email: [''],
    address: [''],
    firstName: [''],
    lastName: [''],
    nickName: [''],
    gender: [''],
    birthday: [''],
    experience: [''],
  });


  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.registerForm.value);
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {


  }

}
