import { HttpClient, HttpParams } from '@angular/common/http';
import { ContactModel } from './contact.model';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { take, exhaustMap, map, tap, single } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class ContactService{

    constructor(private http : HttpClient, private authService : AuthService){}
    onSaveContact(contactData : ContactModel[]){
      return  this.authService.user.pipe(take(1),exhaustMap(user => {
            return this.http.put("https://vignesh-nagarajan.firebaseio.com/contact.json",contactData,
            {
                params : new HttpParams().set('auth',user.token)
            })
        }))
    }

    onFetchContact(){
     return this.authService.user.pipe(take(1),exhaustMap(user => {
            return this.http.get<ContactModel[]>("https://vignesh-nagarajan.firebaseio.com/contact.json")
        }))
    }
}