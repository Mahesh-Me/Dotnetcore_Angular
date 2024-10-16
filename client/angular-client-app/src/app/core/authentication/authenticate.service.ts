import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '../../shared/models/loginDto';
import { Observable } from 'rxjs';
import { ServerResponse } from '../../shared/models/server-response';
import { CONFIGURATAION } from '../../configs/app-settings.config';
import { CurrentUserService } from './currentuser.service';
import { LoggerService } from '../services/logger.service';

@Injectable()
export class AuthenticateService {

  redirectUrl:string = '/auth/login';
  constructor(
    private http:HttpClient,
    private currentUserService: CurrentUserService,
    private _logger:LoggerService
  ) { }

  public logIn(loginDto:LoginDto): Observable<ServerResponse>{
    let actionUrl = CONFIGURATAION.ServerURL + CONFIGURATAION.baseURLs.apiUrl + 'User/AuthenticateUser';
    this.currentUserService.setToken = null;
    return new Observable((observer => {
      this.http.post(actionUrl,JSON.stringify(loginDto)).subscribe({
        next: (response:any) => {
          if(response.success && response.result != null){
            let tokenResult = response.result;
            this.currentUserService.setToken = tokenResult.token;
            this.currentUserService.setEmailId = tokenResult.userEmail;
            this._logger.logSuccess(response.message);
          }
          observer.next(response);
        },
        error:(err => {
          if(err){
              this._logger.logError(err.message);
          }
        })
      })
        observer.complete();
    }))
  }
  isLogin() {
    if (this.currentUserService.getToken) {
      return true;
    }
    return false;
  }
}
