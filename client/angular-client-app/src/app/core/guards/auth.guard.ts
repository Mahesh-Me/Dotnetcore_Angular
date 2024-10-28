import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { LoggerService } from "../services/logger.service";
import { AuthenticateService } from "../authentication/authenticate.service";


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate{
    constructor(
        private router: Router,
        private logger: LoggerService,
        private authenticationService: AuthenticateService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.chekUser();
        //return true;
    }
    private chekUser(): boolean {
        const isLogin = this.authenticationService.isLogin();
         if (isLogin) {
        
          return true;
        }
        else {
          this.logger.logError('Not authenticated, redirecting...');
          this.authenticationService.clientlogout();
            let logOutURL = '/auth/login';
            this.router.navigate([logOutURL]);
          return false;
        }
      }
}