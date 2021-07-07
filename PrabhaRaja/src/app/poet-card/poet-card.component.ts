import { stringify } from '@angular/compiler/src/util';
import { ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataService, poemModel } from '../data.service';

@Component({
  selector: 'app-poet-card',
  templateUrl: './poet-card.component.html',
  styleUrls: ['./poet-card.component.css']
})
export class PoetCardComponent implements OnInit,OnDestroy {

   currentAccount : string = "";
   poems:poemModel[]=[];
   subscription : Subscription = new Subscription;
   loginSubscription :  Subscription = new Subscription;
   isAuthenticated : boolean = false;

  toggleBadgeVisibility(id : number) {
    this.dataService.onLike(id);
  }

  onDelete(index : number) {
    this.dataService.deletePoem(index);
  }
  constructor(private dataService : DataService,private authService : AuthService,
    private ref : ChangeDetectorRef) { }

  ngOnInit(): void {
    this.dataService.getCurrentAccount();
    this.currentAccount=this.dataService.currentAccount;
    this.poems.map(
      poem => {
        poem.likedAccount.map(account => {
          account == this.currentAccount ? poem.liked=true:poem.liked=false;
          poem.likeCount=poem.likedAccount.length;
        })
      });    
      this.subscription = this.dataService.poemsUpdated.subscribe (
        (poems : poemModel[]) => {
          this.poems = poems;
        }
      );
      this.poems=this.dataService.getPoems();
      this.dataService.onFetchPoems();
      this.loginSubscription = this.authService.user.subscribe(user =>{
        this.isAuthenticated = !(user.token==null);
        this.ref.detectChanges();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
