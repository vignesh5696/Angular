import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
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
  poemEmitted = new Subject<poemModel[]>();
  lastIdCount : number = -1;
  currentAccount  : string ="";
  isExistingUser:boolean = false;
  isUserLoaded : boolean = false;
  userList : string[] =[] ;
  userDetailList : string[] =[] ;
  LoggedInUser : string = "User";
  currentFilterValue : string = "";
  emitAccount = new BehaviorSubject<string>("null");
  emitLoadedUser = new BehaviorSubject<boolean>(false);
  emitLoadedUserName = new BehaviorSubject<string>(this.LoggedInUser);
  userSubscription : Subscription = new Subscription();
  // emitLoading = new Subject<boolean>();
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
    // this.emitLoading.next(true);
    this.http.get<number>('https://prabha-raja-default-rtdb.firebaseio.com/lastId.json')
    .subscribe(res => {
      this.lastIdCount=res;
    },err =>{
      
    });
    this.http.get<poemModel[]>('https://prabha-raja-default-rtdb.firebaseio.com/poems.json')
    .subscribe(res => {
      // this.emitLoading.next(false);
      if(res != null){
      this.setPoems(res);
      }
      else{
        this.fetchedPoems=[];
        this.updateTempData();
      }
      },err =>{
        // this.emitLoading.next(false);
        this.poemsUpdated.next(undefined);
      });
      // this.emitLoading.next(false);
  }

  getPoems() {
    return this.poems.slice();
  }

  getDbPoems() {
    return this.http.get<poemModel[]>('https://prabha-raja-default-rtdb.firebaseio.com/poems.json');
  }

  setPoems(poems : poemModel[]) {
    // console.log(poems)
    this.fetchedPoems = [...poems];
    this.updateTempData();
  }

  addPoems(poem:poemModel) {
    var tempArr : poemModel[]=[];
    tempArr.push(poem);
    this.fetchedPoems=[...tempArr,...this.fetchedPoems];
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
    var deleteIndex=this.getFetchedIndexForId(id);
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

  getFetchedIndexForId(id : number) {
   return this.fetchedPoems.findIndex(data => {
      return data.Id === id;
    })
  }

  filterPoems(value : string) {
    this.currentFilterValue = value;
    this.poems=this.fetchedPoems.filter(list => {
      return list.Header.toLowerCase().includes(value.toLowerCase());
    })
    this.poemsUpdated.next(this.poems);
  }

  updateTempData() {
    this.poems=this.fetchedPoems;
    this.poemsUpdated.next(this.poems.slice());
    this.filterPoems(this.currentFilterValue);
  }

  updateIdCount(){
    this.lastIdCount++;
    this.http.put<number>('https://prabha-raja-default-rtdb.firebaseio.com/lastId.json',this.lastIdCount)
    .subscribe(res => {
      // console.log(res)
    });
  }

  getCurrentAccount() {
    var tempId=localStorage.getItem("tempIp") || "";
    if(tempId.length > 0) {
      this.userList.map(user => {
        user == tempId ? this.currentAccount=tempId :""
      });
    }else {
      this.currentAccount="";
    }
    this.emitAccount.next(this.currentAccount);
  }

  onLike(id : number,liked : boolean) {
    var likedIndex=this.fetchedPoems.findIndex(data => {
      return data.Id === id;
    })
    if(likedIndex !== -1) {
      this.fetchedPoems[likedIndex].liked=!this.fetchedPoems[likedIndex].liked;
      if(liked) {
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
        this.fetchedPoems[likedIndex].likedAccount.splice(getCurrentAccountIndex,1);
      }
      this.http.put<poemModel[]>('https://prabha-raja-default-rtdb.firebaseio.com/poems.json',this.fetchedPoems).subscribe(res => {
        // console.log(res)
      })
  }
}

  checkExistingUser() {
    return this.http.get<string[]>('https://prabha-raja-default-rtdb.firebaseio.com/signedInUserList.json');
  }

  insertNewUser() {
    return this.http.put<string[]>('https://prabha-raja-default-rtdb.firebaseio.com/signedInUserList.json',
    this.userList);
  }

  getUserDetail() {
    return this.http.get<string[]>('https://prabha-raja-default-rtdb.firebaseio.com/signedInUserDetailList.json');
  }

  setUserDetailList() {
    this.http.put<string[]>('https://prabha-raja-default-rtdb.firebaseio.com/signedInUserDetailList.json',
    this.userDetailList).subscribe();
  }

  isSignedIn() {
    let cookieUserName : string = localStorage.getItem("tempIp") || "";
    this.currentAccount=cookieUserName;
    this.emitAccount.next(this.currentAccount);
    if(cookieUserName.length != 0) {
      this.getUserDetail().subscribe(userDetails  => {
        userDetails.map(userDetail => {
          if(userDetail.includes(cookieUserName)) {
            var arr : string[] = userDetail.split("-");
            this.LoggedInUser=arr[1];
            this.emitLoadedUserName.next(this.LoggedInUser);
          }
        });
      });
      this.userSubscription=this.checkExistingUser().subscribe(userList => {
        if(userList) {
          this.userList = userList;
          userList.map(user => {
            if(user == cookieUserName.trim()) {
              this.isExistingUser =true;
            }
          });
        }
      this.isUserLoaded = true;
      this.emitLoadedUser.next(this.isExistingUser);
      },err => {
        this.isUserLoaded = true;
        this.emitLoadedUser.next(this.isExistingUser);
      });
      this.emitLoadedUser.next(this.isExistingUser);
    }else {
      this.isUserLoaded = true;
      this.emitLoadedUser.next(this.isExistingUser);
    }
  }

  insertUser(id : string,name:string,email:string) {
     this.checkExistingUser().subscribe(userList => {
       if(userList) {
        this.userList = userList;
        var exist = false;
        this.userList.map(userId => {
           if(userId == id){
             exist=true;
           }
        });
        if(!exist) {
            this.userList.push(id);
        }
       }else{
          this.userList=[];
          this.userList.push(id);
       }
       this.getUserDetail().subscribe(userDetailList => {
         if(userDetailList) {
          this.userDetailList = userDetailList;
          var userDetailFound = false;
          var currentDetail : string = id+"-"+name+"-"+email;
          this.userDetailList.map(userDetail => {
            if(userDetail == currentDetail) {
              userDetailFound = true;
              this.LoggedInUser = name;
            this.emitLoadedUserName.next(this.LoggedInUser);
            }
          });
          if(!userDetailFound) {
            this.userDetailList.push(currentDetail);
            this.setUserDetailList();
          }
         }
       });
       this.insertNewUser().subscribe(res=> {
       this.isSignedIn();
      });
     });
  }

  generateTempIdForMail(email : string) {
    this.getUserDetail().subscribe(userDetailList => {
      var tempId : string="";
      var userDetailFound = false;
      if(userDetailList) {
       this.userDetailList = userDetailList;
       this.userDetailList.map(userDetail => {
         var arr : string[]=userDetail.split("-");
         if(arr[2] == email && arr[0].includes(email)) {
           userDetailFound = true;
           tempId = arr[0];
         }
       });
       if(!userDetailFound) {
        var date = new Date();
        var tempValue : string=date.getDate().toString()+
        date.getMonth().toString()+
        date.getFullYear().toString()+
        date.getHours().toString()+
        date.getMinutes().toString()+
        date.getMilliseconds().toString();
        tempId = (tempValue+email);
       }
      }
      var tempName : string[] = email.split("@");
      this.insertUser(tempId,tempName[0],email);
      localStorage.setItem("tempIp",tempId);
    });
  }
}
