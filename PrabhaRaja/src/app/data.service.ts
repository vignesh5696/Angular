import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface poemModel {
  Header :string,
  Date : string,
  Content : string,
  likeCount:number,
  likedAccount:string[],
  liked:boolean
}
@Injectable({
  providedIn: 'root'
})
export class DataService {

  poemsUpdated = new Subject<poemModel[]>();

   private poems:poemModel[]=[
    {
      Header:"Love",
      Date:"05/06/1996",
      Content:"dsfsdfsdsd",
      likeCount:0,
      likedAccount:['Vignesh'],
      liked:false
    },
    {
      Header:"Love",
      Date:"05/06/1996",
      Content:"dsfsdfsdsd",
      likeCount:0,
      likedAccount:['Prabha'],
      liked:false
    }
  ];

  constructor() { }

  getPoems() {
    return this.poems.slice();
  }

  addPoems(poem:poemModel) {
    this.poems.push(poem);
    this.poemsUpdated.next(this.poems.slice());
  }
  deletePoem(index : number) {
    this.poems.splice(index,1);
    this.poemsUpdated.next(this.poems.slice());
  }

}
