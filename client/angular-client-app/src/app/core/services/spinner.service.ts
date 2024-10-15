import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  constructor() { }

  showLoader(){
    this.loadingSubject.next(true);
  }
  hideLoader(){
    this.loadingSubject.next(false);
  }
  getMessage(): Observable<any> {
    return this.loadingSubject.asObservable();
}
}
