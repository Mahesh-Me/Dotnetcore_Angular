import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
  })
  
  export class RepositoryAbstractService{
    constructor(private http: HttpClient) {

    }
    public getAll<T>(url: string): Observable<T> {
        return this.http.get<T>(url);
    }
    public add<T>(url: string,params?: any): Observable<T> {
        return this.http.post<T>(url,params);
    }
  }