import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;
  hideConfimPassword = true;
  registerForm!: FormGroup;
  imageSrc = 'assets/image/logo.png';
  imageAlt = 'logo';
  constructor(private formBuilder: FormBuilder) { }
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      account: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9-_]*')]],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9-_]*')]],
      confirmPassword: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9-_]*')]],
      email: [''],
      address: [''],
      firstName: [''],
      lastName: [''],
      nickName: [''],
      gender: [''],
      birthday: [''],
      experience: [''],
    });
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.registerForm.value);
  }

}
