export class ServerResponse {
    message!: string;
    error?: ErrorDetail;
    result?: any;
    success?: boolean;
    count?: any;
    targetUrl?: any;
    unAuthorizedRequest:any;
    _abp?:boolean;
  }
  export class ErrorDetail{
    message?:string;
    details:any;
  }