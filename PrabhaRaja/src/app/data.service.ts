import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { exhaustMap, take, tap } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';

export interface poemModel {
  Id : number,
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
  lastIdCount : number = -1;
  currentAccount  : string ="";
   private fetchedPoems:poemModel[]=[
    // {
    //   Id : 1,
    //   Header:"Love",
    //   Date:"05/06/1996",
    //   Content:"dsfsdfsdsd",
    //   likeCount:0,
    //   likedAccount:['Vignesh'],
    //   liked:false
    // },
    // {
    //   Id : 2,
    //   Header:"Love",
    //   Date:"05/06/1996",
    //   Content:"dsfsdfsdsd",
    //   likeCount:0,
    //   likedAccount:['Prabha'],
    //   liked:false
    // }
  ];
  private poems : poemModel[]=this.fetchedPoems;
  constructor(private http : HttpClient, private authService : AuthService) { }

  onFetchPoems() {
    this.http.get<number>('https://prabha-raja-default-rtdb.firebaseio.com/lastId.json')
    .subscribe(res => {
      this.lastIdCount=res;
    }
    )
    this.http.get<poemModel[]>('https://prabha-raja-default-rtdb.firebaseio.com/poems.json')
    .subscribe(res => {
      if(res != null){
      this.setPoems(res);
      }
      else{
        this.fetchedPoems=[];
        this.updateTempData();
      }
      },err =>{
      });
  }
  getPoems() {
    return this.poems.slice();
  }

  setPoems(poems : poemModel[]) {
    // console.log(poems)
    this.fetchedPoems = [...poems];
    this.updateTempData();
  }

  addPoems(poem:poemModel) {
    this.fetchedPoems.push(poem);
    this.updateTempData();
    this.updateIdCount();
    return this.updateDb();
  }

  updateDb() {
    return this.authService.user.pipe(take(1),exhaustMap(user => {
    return  this.http.put<poemModel[]>('https://prabha-raja-default-rtdb.firebaseio.com/poems.json',this.fetchedPoems,
    {
      params  : new HttpParams().set('auth',user.token?user.token:"")
  })
}))
  }

  deletePoem(id : number) {
    var deleteIndex=this.fetchedPoems.findIndex(data => {
      return data.Id === id;
    })
    if(deleteIndex !== -1) {
      this.fetchedPoems.splice(deleteIndex,1)
      this.authService.user.pipe(take(1),exhaustMap(user => {
      return this.http.put<poemModel[]>('https://prabha-raja-default-rtdb.firebaseio.com/poems.json',
    this.fetchedPoems,{
      params  : new HttpParams().set('auth',user.token?user.token:"")
  })
})).subscribe(res => {
      this.onFetchPoems();
    },err => {
      if(err.status==401)
      localStorage.clear();
    })
    }
  }

  filterPoems(value : string) {
    this.poems=this.fetchedPoems.filter(list => {
      return list.Header.toLowerCase().includes(value.toLowerCase());
    })
    this.poemsUpdated.next(this.poems);
  }

  updateTempData() {
    this.poems=this.fetchedPoems;
    this.poemsUpdated.next(this.poems.slice());
  }

  updateIdCount(){
    this.lastIdCount++;
    this.http.put<number>('https://prabha-raja-default-rtdb.firebaseio.com/lastId.json',this.lastIdCount)
    .subscribe(res => {
      // console.log(res)
    });
  }

  getCurrentAccount() {
    this.http.get('https://jsonip.com').subscribe((res:any) => {
      this.currentAccount = res.ip
    },err => {
      // console.log("Error"+err[0])
    })
  }

  onLike(id : number) {
    // console.log(this.fetchedPoems)
    var likedIndex=this.fetchedPoems.findIndex(data => {
      return data.Id === id;
    })
    if(likedIndex !== -1) {
      this.fetchedPoems[likedIndex].liked=!this.fetchedPoems[likedIndex].liked;
      if(this.fetchedPoems[likedIndex].liked) {
        this.fetchedPoems[likedIndex].likeCount++;
        this.fetchedPoems[likedIndex].likedAccount.push(this.currentAccount);
      }
      else {
        this.fetchedPoems[likedIndex].likeCount--;
        var index : number = 0;
        var getCurrentAccountIndex : number=-1;
        this.fetchedPoems[likedIndex].likedAccount.map(account => {
          if(account == this.currentAccount) {
            getCurrentAccountIndex = index;
          }else {
            index++;
          }
        });
        // console.log(this.fetchedPoems[likedIndex].likedAccount.splice(getCurrentAccountIndex,1))
        this.fetchedPoems[likedIndex].likedAccount.splice(getCurrentAccountIndex,1);
      }
      this.http.put<poemModel[]>('https://prabha-raja-default-rtdb.firebaseio.com/poems.json',this.fetchedPoems).subscribe(res => {
        // console.log(res)
      })
  }
}
}
