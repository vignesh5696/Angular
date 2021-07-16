import { ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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

  toggleBadgeVisibility(id : number,liked : boolean,event : MouseEvent) {
    this.dataService.onLike(id,liked);
    event.stopPropagation();
    if(liked) {
      this.snackBar.open("Thanks "+this.dataService.LoggedInUser+" !!!","",{
        duration : 3000,
        verticalPosition : 'top'
      });
    }
  }

  onDelete(index : number,event : MouseEvent) {
    this.dataService.deletePoem(index);
    event.stopPropagation();
  }

  constructor(private dataService : DataService,private authService : AuthService,
    private ref : ChangeDetectorRef, private router : Router,private snackBar : MatSnackBar) { }

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
        },err => {
          this.loading=false;
        }
      );
      this.loginSubscription = this.authService.user.subscribe(user =>{
        this.isAuthenticated = !(user.token==null);
        this.ref.detectChanges();
      });
  }
  mapLikedAccount() {
    if(this.poems) {
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
  }

  onCardClick(id : number){
    this.router.navigate(['/view',id]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
