import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { CurrentUserService } from "../authentication/currentuser.service";

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private authenticationService: CurrentUserService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from the service.
    const token = this.authenticationService.getToken;
    console.log('Interceptor hit for:', req.url);
    /*
    * The verbose way:
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    */
    // Clone the request and set the new header in one step.
    if (token) {
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
    }
    if (!req.headers.has('Content-Type')) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    // send cloned request with header to the next handler.
    return next.handle(req).pipe(
      catchError((error:HttpErrorResponse) =>{
        let errorMessage = '';
        if(error.error instanceof ErrorEvent){
          errorMessage = error.message;
        }
        else{
          errorMessage = error.message;
        }
        if (error.status === 401){
          errorMessage = "Unauthorized Access";
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}