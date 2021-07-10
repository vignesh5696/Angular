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
   loading : boolean = false;

  toggleBadgeVisibility(id : number,liked : boolean) {
    this.dataService.onLike(id,liked);
  }

  onDelete(index : number) {
    this.dataService.deletePoem(index);
  }
  constructor(private dataService : DataService,private authService : AuthService,
    private ref : ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loading = true;
    this.dataService.getCurrentAccount();
    this.dataService.emitAccount.subscribe(res=>{
      this.currentAccount=res;
      this.mapLikedAccount();
    });
    this.dataService.onFetchPoems();
      this.subscription = this.dataService.poemsUpdated.subscribe (
        (poems : poemModel[]) => {
          this.poems = poems;
      this.mapLikedAccount();
      this.loading=false;
        }
      );
      // this.poems=this.dataService.getPoems();
      this.loginSubscription = this.authService.user.subscribe(user =>{
        this.isAuthenticated = !(user.token==null);
        this.ref.detectChanges();
      });
  }
  mapLikedAccount() {
    this.poems.map(
      poem => {
        poem.liked=false;
        poem.likedAccount.map(account => {
          if(account == this.currentAccount){
           poem.liked=true;
          }
        })
        poem.likeCount=poem.likedAccount.length-1;
      });   
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
