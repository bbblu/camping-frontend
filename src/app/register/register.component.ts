import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    account: ['',Validators.required],
    password: ['',Validators.required],
    connection: this.fb.group({
      phone: [''],
      email: [''],
      address: ['']
    }),
    basic_information: this.fb.group({
      firstname: [''],
      lastname: [''],
      diminutive: [''],
      gender: [''],
      birthday: [''],
      camping: ['']
    }),
  });


  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.registerForm.value);
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    
  }

}
