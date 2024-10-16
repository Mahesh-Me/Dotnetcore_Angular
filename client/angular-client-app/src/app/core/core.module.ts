import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CurrentUserService } from './authentication/currentuser.service';
import { AuthenticateService } from './authentication/authenticate.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoggerService } from './services/logger.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http-token.interceptor';
import { SpinnerService } from './services/spinner.service';
import { RepositoryAbstractService } from './http/repository-abstract.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass:'toast-top-right',
      preventDuplicates:true
     
    })
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi:true
    },
    CurrentUserService,
    SpinnerService,
    LoggerService,
    RepositoryAbstractService,
    AuthenticateService
  ]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule:CoreModule
  ){
    if(parentModule){
      throw new Error(
        'CoreModule is already loaded. Import it in the AppConfig only.'
      );
    }
  }
 }
