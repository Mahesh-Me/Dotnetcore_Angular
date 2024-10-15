import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(
    private _toastr:ToastrService
  ) { }

  logSuccess(message:string){
    this._toastr.success(message,'Success');
  }
  logError(message:string){
    this._toastr.error(message,'Error');
  }
  logWarn(message:string){
    this._toastr.warning(message,'Warning');
  }
  logInfo(message:string){
    this._toastr.info(message,'Info');
  }
}
