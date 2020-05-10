import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject,  } from 'rxjs';
import { environment } from '../../../../src/environments/environment';

import { User } from '../user.model';
import { Router } from '@angular/router';


interface AuthResponseData{
    kind:  string;
    idToken:string;
    email :  string;
    refreshToken: string;
    expiresIn : string;
    localId : string;
    registered?:string;
}

@Injectable({providedIn:'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);

    private tokenExpirationTimer : any;

    constructor(private http:HttpClient, private router : Router){}

    signup(email:string,password:string){
        return this.http.post<AuthResponseData>(
"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+ environment.firebaseAPIKey,
           {
               email: email,
               password : password,
               returnSecureToken : true
           } ).pipe(catchError(errorRes => {
               console.log(errorRes)
            let errorMsg = "Error occured";
            if(!errorRes.error || !errorRes.error.error){
                return throwError(errorMsg);
            }
            switch(errorRes.error.error.message){
                case 'EMAIL_EXISTS' :
                    errorMsg="Already this user exists"
            }
            return throwError(errorMsg);
        }
           ),tap(resData => {
               const expirationDate= new Date(new Date().getTime() + +resData.expiresIn*1000);
               const user = new User(resData.email,resData.localId,resData.idToken,expirationDate);
               this.user.next(user);
               this.autoLogout(+ resData.expiresIn*1000);
               localStorage.setItem('userData',JSON.stringify(user));
           }))

    }

    signin(email: string,password:string){

        return this.http.post<AuthResponseData>(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+ environment.firebaseAPIKey,
         {
             email :email,
             password :password,
             returnSecureToken : true
         }).pipe(catchError(errorRes => {
            let errorMsg = "Error occured";
            if(!errorRes.error || !errorRes.error.error){
                return throwError(errorMsg);
            }
            switch(errorRes.error.error.message){
                case 'EMAIL_EXISTS' :
                    errorMsg="Already this user exists"
            }
            return throwError(errorMsg);
        }
           ),tap(resData => {
            const expirationDate= new Date(new Date().getTime() + +resData.expiresIn*1000);
            const user = new User(resData.email,resData.localId,resData.idToken,expirationDate);
            this.user.next(user);
            this.autoLogout(+ resData.expiresIn*1000);
            localStorage.setItem('userData',JSON.stringify(user));
        }))

    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer=null;
    }

    autoLogin(){
        const userData : {
            email : string;
            id: string;
            _token:string;
            _tokenExpirationDate: string;
        }=JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }
        const loadedUser = new User(userData.email,
            userData.id,userData._token,new Date(userData._tokenExpirationDate));
        if(loadedUser.token){
            this.user.next(loadedUser);
            this.autoLogout(new Date(userData._tokenExpirationDate).getTime()-new Date().getTime());
        }
    }

    autoLogout(expirationDuration:number){
        this.tokenExpirationTimer= setTimeout(() => {
            this.logout();
        },expirationDuration);
    }
}