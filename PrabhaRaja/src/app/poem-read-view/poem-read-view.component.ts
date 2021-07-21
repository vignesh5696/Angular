import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataService, poemModel } from '../data.service';

@Component({
  selector: 'app-poem-read-view',
  templateUrl: './poem-read-view.component.html',
  styleUrls: ['./poem-read-view.component.css']
})
export class PoemReadViewComponent implements OnInit {
  currentAccount : string = "";
  currentIndex : number = -1;
  subscription : Subscription = new Subscription;
  accountSubscription : Subscription = new Subscription;
  loading : boolean = false;
  fetchedPoems : poemModel[]=[];
  prevEnabled : boolean = this.currentIndex != 0;
  nextEnabled : boolean = this.currentIndex != this.fetchedPoems.length-1;
  poem : poemModel ={
    Id : -1,
    Header : "",
    Date : "",
    Content : "",
    likeCount : 0,
    likedAccount : [],
    liked : false
  };
  @Output() close = new EventEmitter<void>();

 constructor(private dataService : DataService,private authService : AuthService,
   private ref : ChangeDetectorRef,private router : Router,private route : ActivatedRoute,
   private snackBar : MatSnackBar) { }

 ngOnInit(): void {
   this.loading = true;
   this.dataService.getCurrentAccount();
   this.accountSubscription=this.dataService.emitAccount.subscribe(res=>{
      this.currentAccount=res;
      this.mapLikedAccount();
    });
   this.route.params.subscribe(param => {
     var foundIndex  = false;
     this.dataService.onFetchPoems();
     this.subscription = this.dataService.poemsUpdated.subscribe(poems => {
       if(poems) {
        this.fetchedPoems = poems;
        this.fetchedPoems.map(data => {
          if(data.Id === +param['id']) {
            this.poem=data;
            this.currentIndex = this.getFetchedIndexForId(data.Id);
            this.prevEnabled  = this.currentIndex != 0;
            this.nextEnabled  = this.currentIndex != this.fetchedPoems.length-1;
            this.mapLikedAccount();
            this.loading=false;
            foundIndex = true;
          }
        });
        if(!foundIndex) {
          this.router.navigate(['/']);
        }
       }else {
        this.loading=false;
        this.router.navigate(['/']);
       }
    },err => {
      this.loading=false;
      this.router.navigate(['/']);
    });
   });
 }

 mapLikedAccount() {
   if(this.poem.Id != -1) {
    this.poem.liked=false;
    this.poem.likedAccount.map(account => {
      if(account == this.currentAccount){
       this.poem.liked=true;
      }
    })
    this.poem.likeCount=this.poem.likedAccount.length-1;
   }
 }

 getFetchedIndexForId(id : number) {
  return this.fetchedPoems.findIndex(data => {
     return data.Id === id;
   })
 }

toggleBadgeVisibility(id : number,liked : boolean) {
  this.dataService.onLike(id,liked);
  if(liked) {
    this.snackBar.open("Thanks "+this.dataService.LoggedInUser+" !!!","",{
       duration :3000,
       verticalPosition : 'top'
    });
  }
}

onPrev() {
  this.currentIndex--;
  this.prevEnabled  = this.currentIndex != 0;
  this.nextEnabled  = this.currentIndex != this.fetchedPoems.length-1;
  var id =this.fetchedPoems[this.currentIndex].Id;
  this.router.navigate(['view',id]);
}

onNext() {
  this.currentIndex++;
  this.prevEnabled  = this.currentIndex != 0;
  this.nextEnabled  = this.currentIndex != this.fetchedPoems.length-1;
  var id =this.fetchedPoems[this.currentIndex].Id;
  this.router.navigate(['view',id]);
}

 onClose(){
   this.router.navigate(['/']);
}

 ngOnDestroy() {
   if(this.subscription)
   this.subscription.unsubscribe();
   if(this.accountSubscription)
   this.accountSubscription.unsubscribe();
 }

}
