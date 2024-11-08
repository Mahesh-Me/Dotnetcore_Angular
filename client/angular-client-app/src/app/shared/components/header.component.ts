import { Component } from '@angular/core';
import { AuthenticateService } from '../../core/authentication/authenticate.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from "bootstrap";
import { ChangePasswordDto } from '../models/changePasswordDto';
import { CurrentUserService } from '../../core/authentication/currentuser.service';
import { LoggerService } from '../../core/services/logger.service';
import { SpinnerService } from '../../core/services/spinner.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  changePasswordForm !: FormGroup;
  passwordDto:ChangePasswordDto = new ChangePasswordDto();

  constructor(
    private _authService:AuthenticateService,
    private _router:Router,
    private fb: FormBuilder,
    private _currentUserService: CurrentUserService,
    private _loggerService: LoggerService,
    private _spinnerService: SpinnerService
  ){
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onLogOut(){
    this._authService.clientlogout().subscribe({
      next:() => {
        this._router.navigate(['/auth/login']);
      }
    })
  }
  onClickToDashboard(){
    this._router.navigate(['/services/dashboard']);
  }
  onClickToTransaction(){
    this._router.navigate(['/services/transaction-history']);
  }

  get newPasswordMismatch() {
    const oldPassword = this.changePasswordForm.get('oldPassword')?.value;
    const newPassword = this.changePasswordForm.get('newPassword')?.value;
    return oldPassword && newPassword && oldPassword === newPassword;
  }

  get passwordsDoNotMatch() {
    const newPassword = this.changePasswordForm.get('newPassword')?.value;
    const confirmPassword = this.changePasswordForm.get('confirmPassword')?.value;
    return newPassword && confirmPassword && newPassword !== confirmPassword;
  }
  onSubmit() {
    if (this.changePasswordForm.valid && !this.newPasswordMismatch && !this.passwordsDoNotMatch) {
      this._spinnerService.showLoader();
      this.passwordDto = new ChangePasswordDto();
      this.passwordDto.emailId = this._currentUserService.getEmailId!;
      this.passwordDto.oldPassword = this.changePasswordForm.get('oldPassword')?.value;
      this.passwordDto.newPassword = this.changePasswordForm.get('newPassword')?.value;

      this._authService.changePasswordOfUser(this.passwordDto).subscribe({
        next: (res:any) => {
          if(res != null){
            this._loggerService.logSuccess("Password Changed successfully");
            this._spinnerService.hideLoader();
            this.closeBudgetModal();
          }
          this._spinnerService.hideLoader();
        },
        error: (err) => {
          if(err){
            this._loggerService.logError(err.message);
            this._spinnerService.hideLoader();
          }
        }
      })
      // Process the password change
      console.log('Password changed successfully');
    }
  }
  openExpenseModal() {
    const modal = new bootstrap.Modal(document.getElementById('changePasswordModal') as HTMLElement);
    modal.show();
  }
  closeBudgetModal() {
    const modalElement = document.getElementById('changePasswordModal') as HTMLElement;
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
  if (modalInstance) {
    modalInstance.hide();
  }
}
}
