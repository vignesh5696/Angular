import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';
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

@Injectable({
    providedIn:"root"
})
export class AuthService{
    constructor(private http: HttpClient,private router  : Router){
        this.autoLogin();
    }
  user = new BehaviorSubject<User>(new User("","","",new Date));

  private tokenExpirationTimer : any;

    login(email:string, password: string){
      return  this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAAGkNW8jNcUjLiCWTIR2--xi1hM7QhYuY",
        {
          email : email,
          password : password,
          returnSecureToken : true
        }).pipe(tap(resData => {
          const expirationDate = new Date(new Date().getTime() + +resData.expiresIn*1000);
          const user =new User(resData.email,resData.localId,resData.idToken,expirationDate);
          this.user.next(user);
          localStorage.setItem('userData',JSON.stringify(user));
          this.autoLogout(+ resData.expiresIn*1000);
        
        }));
    }
    logout(){
        this.user.next(new User("","","",new Date));
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
    }

    autoLogin(){
        var param  = localStorage.getItem('userData') || '';
        if(param==''){
            return;
        }
            const userData : {
                email : string;
                id: string;
                _token:string;
                _tokenExpirationDate: string;
            }=JSON.parse(param);
        const loadedUser = new User(userData.email,
            userData.id,userData._token,new Date(userData._tokenExpirationDate));
        if(loadedUser.token != ""){
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