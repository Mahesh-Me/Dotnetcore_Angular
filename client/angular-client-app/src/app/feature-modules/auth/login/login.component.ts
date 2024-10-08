import { Component } from '@angular/core';
import { LoginDto } from '../../../shared/models/loginDto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoginMode:boolean = true;
  loginDto:LoginDto = new LoginDto();
  registrationForm !:FormGroup;

  states = ['Odisha','Andhra Pradesh']

  constructor(
    private formBuilder:FormBuilder
  ){}

  ngOnInit(): void {
    this.initializeRegistrationForm();
  }
  
  initializeRegistrationForm(){
    this.registrationForm = this.formBuilder.group(
      {
        emailId: ['',[Validators.required, Validators.email]],
        fullName: ['',[Validators.required, Validators.maxLength(100)]],
        mobileNumber: ['',
          [Validators.required, Validators.maxLength(10),Validators.pattern(/^[6-9]\d{9}$/)]
        ],
        city:['', 
          [Validators.required,Validators.maxLength(10)]
        ],
        state: ['', 
          [Validators.required]
      ]
      }
    )
  }
  onClickLogIn(){
    console.log(this.loginDto);
  }
  switchToRegister() {
    this.isLoginMode = false;
  }
  switchToLogin() {
    this.isLoginMode = true;
  }
  get registerFormControl() {
    return this.registrationForm.controls;
  }
}
