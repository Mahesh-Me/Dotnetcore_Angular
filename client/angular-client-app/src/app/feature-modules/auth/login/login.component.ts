import { Component} from '@angular/core';
import { LoginDto } from '../../../shared/models/loginDto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpinnerService } from '../../../core/services/spinner.service';
import { LoggerService } from '../../../core/services/logger.service';
import $, { error } from 'jquery';
import { AuthenticateService } from '../../../core/authentication/authenticate.service';
import { ServerResponse } from '../../../shared/models/server-response';
import { Router } from '@angular/router';
import { RegisterUserDto } from '../../../shared/models/registerUserDto';
import * as bootstrap from "bootstrap";

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  



  email !: string;
  isLoginMode:boolean = true;
  loginDto:LoginDto = new LoginDto();
  registrationForm !:FormGroup;
  userDto:RegisterUserDto = new RegisterUserDto();

  states = ['Odisha','Andhra Pradesh','Gujurat','Others']

  constructor(
    private formBuilder:FormBuilder,
    private _spinner:SpinnerService,
    private _logger: LoggerService,
    private _authService:AuthenticateService,
    private _router: Router
  ){}

  ngOnInit(): void {
    this.initializeRegistrationForm();
  }
  initializeRegistrationForm(){
    this.registrationForm = this.formBuilder.group(
      {
        emailId: ['',[Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
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
    this._spinner.showLoader();
    if(this.validationOfLoginDto()){
      this._authService.logIn(this.loginDto).subscribe({
        next: (response: ServerResponse) => {
          if (response && response != null) {
            this._logger.logSuccess("Logged In Successfully");
            this._router.navigate(['/services/dashboard']);
          } 
          else {
            this._logger.logError("Login failed. Please check your credentials.");
          }
          this._spinner.hideLoader();
        },
        error: (err) => {
          this._spinner.hideLoader();
          this._logger.logError(err.message);
        },
        complete: () => {
          this._spinner.hideLoader();
        }
      });
    }
    else{
      this._spinner.hideLoader();
    }
  }
  validationOfLoginDto(): boolean{
    if(this.loginDto.logInEmail == null || this.loginDto.logInEmail.trim() == '' || this.loginDto.logInEmail == undefined){
      this._logger.logError("Email Id cannot be blank.");
      $('#loginId').get(0)?.focus();
      return false;
    }
    if(this.loginDto.logInEmail != null || this.loginDto.logInEmail != undefined || this.loginDto.logInEmail != ''){
      let mailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!mailRegEx.test(this.loginDto.logInEmail)){
        this._logger.logError("Email Id is not valid.");
        $('#loginId').get(0)?.focus();
        return false;
      }
      if(this.loginDto.password == null || this.loginDto.password.trim() == '' || this.loginDto.password == undefined){
        this._logger.logError("Password field cannot be blank");
        $('#password').get(0)?.focus();
        return false;
      }
    }
    return true;
  }
  switchToRegister() {
    this.isLoginMode = false;
    this.initializeRegistrationForm();
  }
  switchToLogin() {
    this.isLoginMode = true;
  }
  get registerFormControl() {
    return this.registrationForm.controls;
  }
  onRegisterSubmit(event:any){
    if(this.registrationForm.valid){
      this._spinner.showLoader();
      this.userDto = {...this.registrationForm.value}
      if(this.userDto != null){
        this._authService.registerUser(this.userDto).subscribe({
          next: (res:any) => {
            if(res && res == true){
              this._logger.logSuccess("Register User Successfully");
              this._spinner.hideLoader();
              this._router.navigate(['/auth/login']);
              window.location.reload();
              this.initializeRegistrationForm();
            }
            this._spinner.hideLoader();
          },
          error: (err) => {
            if(err){
              this._logger.logError(err.message);
              this._spinner.hideLoader();
            }
          },
          complete: () => {
            this._spinner.hideLoader();
          }
        })
      }
    }
  }
  openForgotPasswordModal() {
    const modal = new bootstrap.Modal(document.getElementById('forgotPasswordModal') as HTMLElement);
    modal.show();
  }
  closeForgotPasswordModal() {
    const modalElement = document.getElementById('forgotPasswordModal') as HTMLElement;
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
  if (modalInstance) {
    modalInstance.hide();
  }
}
forgotPasswordOfUser(){
  if(this.email.trim() == '' || this.email == undefined || this.email == null){
    this._logger.logError("Invalid Email Address");
  }
  else{
    this._spinner.showLoader();
    this._authService.forgotPasswordOfUser(this.email).subscribe({
      next: (res:any) => {
        if(res != null){
          this._logger.logSuccess("Email has been sent containing your new password.");
          this._spinner.hideLoader();
          this.closeForgotPasswordModal();
          this.email = '';
        }
        this._spinner.hideLoader();
      },
      error: (err) => {
        if(err){
          this._spinner.hideLoader();
          this._logger.logError(err.message);
        }
      },
      complete: () => {
        this._spinner.hideLoader();
      }
    })
  }
}
}
