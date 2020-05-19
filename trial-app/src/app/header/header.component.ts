import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  isAuthenticated=false;
  private subscription: Subscription;

  constructor(private authService : AuthService, private ref : ChangeDetectorRef) { }

  ngOnInit(): void {
   this.subscription = this.authService.user.subscribe(user => {
     this.isAuthenticated=!!user;
     this.ref.detectChanges();
   })
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
