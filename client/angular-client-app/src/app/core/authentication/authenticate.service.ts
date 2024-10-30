import { HttpClient } from '@angular/common/http';
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

@Injectable()
export class AuthenticateService {

  redirectUrl:string = '/auth/login';
  constructor(
    private http:HttpClient,
    private currentUserService: CurrentUserService,
    private _logger:LoggerService,
    private abstractRepository: RepositoryAbstractService,
  ) { }

  public logIn(loginDto:LoginDto): Observable<ServerResponse>{
    let actionUrl = CONFIGURATAION.ServerURL + CONFIGURATAION.baseURLs.apiUrl + 'Token/Login';
    this.currentUserService.setToken = null;
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
}
