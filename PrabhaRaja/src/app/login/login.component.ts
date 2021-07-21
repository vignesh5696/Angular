import { AfterViewInit, ChangeDetectorRef, Component, DoCheck, NgZone, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { DataService } from '../data.service';

declare const gapi : any;
let auth2 : any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,AfterViewInit,OnDestroy {

  error : boolean = false;
  cookieError : boolean = false;
  errorMessage :string = "";
  emitErrorMessage = new BehaviorSubject<string>(this.errorMessage);
  emitSubscription = new Subscription();
  loaderSubscription = new Subscription();
  loading : boolean = false;
  
  constructor(private dataService : DataService,private ngZone : NgZone,
    private router : Router,private cd : ChangeDetectorRef) { 
    }

  ngOnInit(): void {
    this.loaderSubscription=this.dataService.emitLoadedUser.subscribe(res => {
      if(res) {
        this.router.navigate(['/']);
      }
    });
    this.emitSubscription=this.emitErrorMessage.subscribe(res => {
      if(res != "") {
        this.errorMessage = res;
        this.error=true;
        if(res == "Cookies are not enabled in current environment.") {
          this.cookieError = true;
        }
        this.cd.detectChanges();
      }
      });
  }

  public  googleInit() {
    gapi.load('auth2',() => {
      auth2=gapi.auth2.init({});
      auth2.then(()=> {
        this.attachSignin(document.getElementById('googleBtn'));
      },(err : any) => {
        this.emitErrorMessage.next(err.details);
      });
    });
  }

  attachSignin(element : any) {
    auth2.attachClickHandler(element,{},
      (googleUser : any) => {
        var profile = googleUser.getBasicProfile();
        this.ngZone.run(() => {
          this.onSuccess(profile);
        });
      }
      ,(err : any) => {
        console.log(err);
      }
      );
  }

  onSuccess(profile:any) {
    this.dataService.insertUser(profile.getId(),profile.getName(),profile.getEmail());
    localStorage.setItem("tempIp",profile.getId());
    this.loading=true;
  }

  onSubmit(form:NgForm) {
    this.ngZone.run(() => {
    if(form.form.status == "VALID") {
      const email= form.value.email;
      this.dataService.generateTempIdForMail(email);
      // var tempName : string[] = email.split("@");
      // this.dataService.insertUser(tempId,tempName[0],email);
      // localStorage.setItem("tempIp",tempId);
      this.loading=true;
    }
  });
  }

  ngAfterViewInit() {
    this.googleInit();
  }

  ngOnDestroy() {
    if(this.loaderSubscription) {
      this.loaderSubscription.unsubscribe();
    }
    if(this.emitSubscription) {
      this.emitSubscription.unsubscribe();
    }
  }

}
