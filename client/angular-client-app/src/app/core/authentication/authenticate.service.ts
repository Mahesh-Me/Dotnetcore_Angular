import { Injectable } from '@angular/core';
import { LoginDto } from '../../shared/models/loginDto';
import { Observable } from 'rxjs';
import { ServerResponse } from '../../shared/models/server-response';
import { CONFIGURATAION } from '../../configs/app-settings.config';
import { CurrentUserService } from './currentuser.service';
import { LoggerService } from '../services/logger.service';
import { RepositoryAbstractService } from '../http/repository-abstract.service';
import { of as observableOf, of } from 'rxjs';
import { RegisterUserDto } from '../../shared/models/registerUserDto';
import { ChangePasswordDto } from '../../shared/models/changePasswordDto';
import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class AuthenticateService {

  redirectUrl:string = '/auth/login';
  constructor(
    private currentUserService: CurrentUserService,
    private _logger:LoggerService,
    private abstractRepository: RepositoryAbstractService,
    private _spinnerService: SpinnerService
  ) { }

  public logIn(loginDto:LoginDto): Observable<ServerResponse>{
    let actionUrl = CONFIGURATAION.ServerURL + CONFIGURATAION.baseURLs.apiUrl + 'Token/Login';
    this.currentUserService.setToken = null;
    this._spinnerService.showLoader();
    return new Observable((observer => {
      this.abstractRepository.add(actionUrl,loginDto).subscribe({
        next: (response:any) => {
          if(response && response != null){
            let tokenResult = response;
            this.currentUserService.setToken = tokenResult.token;
            this.currentUserService.setEmailId = tokenResult.userEmail;
          }
          observer.next(response);
          observer.complete();
        },
        error:(err => {
          if(err){
            this._spinnerService.hideLoader();
              this._logger.logError(err.message);
          }
        })
      })
        
    }))
  }
  isLogin() {
    if (this.currentUserService.getToken) {
      return true;
    }
    return false;
  }
  clientlogout(): Observable<boolean> {
    this.currentUserService.clearUserInfo();
    return observableOf(true);
  }
  registerUser(registerDto:RegisterUserDto):Observable<ServerResponse>{
    let actionUrl = CONFIGURATAION.ServerURL + CONFIGURATAION.baseURLs.apiUrl + 'Token/Register';
    return this.abstractRepository.add(actionUrl,registerDto);
  }
  changePasswordOfUser(changePassword:ChangePasswordDto): Observable<ServerResponse>{
    let actionUrl = CONFIGURATAION.ServerURL + CONFIGURATAION.baseURLs.apiUrl + 'Token/ChangePassword';
    return this.abstractRepository.add(actionUrl,changePassword);
  }
  forgotPasswordOfUser(email:string):Observable<ServerResponse>{
    let actionUrl = CONFIGURATAION.ServerURL + CONFIGURATAION.baseURLs.apiUrl + 'Token/ForgotPasswordOfUser/' + email;
    return this.abstractRepository.add(actionUrl);
  }
}
