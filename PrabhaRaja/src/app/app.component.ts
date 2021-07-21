import { Location } from '@angular/common';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'PrabhaRaja';
  loaded : boolean = false;
  userFound : boolean = false;
  reDirectURL : string ="/";
  loaderSubscription = new Subscription();

  constructor(private dataService : DataService, private router : Router,
    private location : Location,private ngZone : NgZone,private route : ActivatedRoute){}
  ngOnInit() {
    this.reDirectURL =this.location.path();
    this.dataService.isSignedIn();
    this.loaderSubscription=this.dataService.emitLoadedUser.subscribe(userFound => {
      this.userFound = userFound;  
      this.loaded = this.dataService.isUserLoaded;
      if(this.loaded)
        this.navigateTo();
    });
  }


  navigateTo() {
    if(this.userFound){
      if(this.reDirectURL != "/login") {
        setTimeout(() => {
          this.router.navigate([this.reDirectURL]);
        },0)
      } else {
      this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/login']);
      }
  }  

  ngOnDestroy() {
    if(this.loaderSubscription)
    this.loaderSubscription.unsubscribe();
  }
  
}
