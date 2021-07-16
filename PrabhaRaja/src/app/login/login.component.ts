import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';
import { DataService } from '../data.service';

declare const gapi : any;
let auth2 : any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,AfterViewInit {

  error : boolean = false;
  loading : boolean = false;
  
  constructor(private dataService : DataService,private ngZone : NgZone) { }

  ngOnInit(): void {
  }

  public  googleInit() {
    gapi.load('auth2',() => {
      auth2=gapi.auth2.init({});
      this.attachSignin(document.getElementById('googleBtn'));
    })
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
  }

  ngAfterViewInit() {
    this.googleInit();
  }
}
