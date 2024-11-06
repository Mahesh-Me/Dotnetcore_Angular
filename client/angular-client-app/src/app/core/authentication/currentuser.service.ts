import { Injectable } from "@angular/core";

const credentialsKey = 'currentUser';
const credentialsToken = 'token';

@Injectable()
export class CurrentUserService {

    public set setUser(data:any){
        localStorage.setItem(credentialsKey,data);
    }
    public get getUser(){
        const savedCredential = localStorage.getItem(credentialsKey);
        return savedCredential;
    }
    public set setToken(data:any){
        localStorage.setItem(credentialsToken,data);
    }
    public get getToken(){
        return localStorage.getItem(credentialsToken);
    }
    public set setEmailId(data:any){
        localStorage.setItem('emailId',data);
    }
    public get getEmailId(){
        return localStorage.getItem('emailId');
    }
    public clearUserInfo(){
        localStorage.removeItem(credentialsKey);
        localStorage.removeItem(credentialsToken);
        localStorage.removeItem('emailId');
        localStorage.clear();
    }
}