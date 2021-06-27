import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService, poemModel } from '../data.service';

@Component({
  selector: 'app-poet-card',
  templateUrl: './poet-card.component.html',
  styleUrls: ['./poet-card.component.css']
})
export class PoetCardComponent implements OnInit,OnDestroy {

   currentAccount : String ='Vignesh';
   poems:poemModel[]=[];
   subscription : Subscription = new Subscription;

  toggleBadgeVisibility(index : number) {
    this.poems[index].liked=!this.poems[index].liked;
    this.poems[index].liked?this.poems[index].likeCount++:this.poems[index].likeCount--;
  }

  onDelete(index : number) {
    this.dataService.deletePoem(index);
  }
  constructor(private dataService : DataService) { }

  ngOnInit(): void {
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
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
