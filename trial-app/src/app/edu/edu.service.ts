import { Injectable } from '@angular/core';
import { EduModel } from './edu.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { take, exhaustMap, tap } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class EduService{

    constructor(private http : HttpClient,private authService : AuthService){}

    onSaveEdu(eduData : EduModel[]){
        return this.authService.user.pipe(take(1),exhaustMap(user => {
            return this.http.put<EduModel[]>("https://vignesh-nagarajan.firebaseio.com/edu.json",eduData,{
                params :  new HttpParams().set('auth',user.token)
            })
        }))
    }

    onFetchEdu(){
        return this.authService.user.pipe(take(1),exhaustMap(user => {
            return this.http.get<EduModel[]>("https://vignesh-nagarajan.firebaseio.com/edu.json")
        }))
    }

}