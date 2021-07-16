import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PrabhaRaja';
  loaded : boolean = false;
  userFound : boolean = false;
  reDirectURL : string ="/";

  constructor(private dataService : DataService, private router : Router,
    private location : Location){}
  ngOnInit() {
    this.reDirectURL =this.location.path();
    this.dataService.isSignedIn();
    this.dataService.emitLoadedUser.subscribe(userFound => {
      this.userFound = userFound;  
      this.loaded = this.dataService.isUserLoaded;
      if(this.loaded)
        this.navigateTo();
    });
  }


  navigateTo() {
    if(this.userFound){
      if(this.reDirectURL != "/login") {
      this.router.navigate([this.reDirectURL]);
      } else {
      this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/login']);
      }
  }  
}
