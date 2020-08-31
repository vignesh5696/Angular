import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAuthenticated : boolean = false;
  subscription : Subscription;
  editMode : boolean = false;
  homeSubscription : Subscription;
  fetchSubscription : Subscription;
  loading : boolean = false;
  changesMade : boolean = false;
  error : string =null;
  content  = {body:"Check"};

  constructor(private authService : AuthService,private ref : ChangeDetectorRef,
    private http : HttpClient) { }

  ngOnInit(): void {
     this.subscription = this.authService.user.subscribe(user => {
      this.isAuthenticated=!!user;
      this.ref.detectChanges();
  })
  this.onFetch();
  }

  onSave(){
    if(this.changesMade){
      console.log(this.content)
      this.loading=true;
      this.homeSubscription = this.authService.user.pipe(take(1),exhaustMap(user => {
      return this.http.put("https://vignesh-nagarajan.firebaseio.com/home.json",this.content,{
          params: new HttpParams().set('auth',user.token)
        })})).subscribe(res => {
        this.loading=false;
      },error => {
        this.loading=false;
        console.log(error);
      });
      this.editMode=false;
      this.changesMade=false;
    }
      else{
        console.log("Not edited")
      }
    }
  
    onCancel(){
      if(!this.changesMade)
      this.editMode=false;
      else{
        this.error="Do you want to proceed further without saving ?";
      }
    }
  
    onHandleError(){
      this.error=null;
    }
  
    onOk(){
      this.onFetch();
      this.error=null;
      this.editMode=false;
    }
    onFetch(){
      this.loading=true;
      this.fetchSubscription = this.http.get<{body:""}>("https://vignesh-nagarajan.firebaseio.com/home.json").subscribe(res  => {
        this.content=res;
      this.loading=false;
      },error => {
        console.log(error);
      this.loading=false;
      });
      this.changesMade=false;
    }
  
    ngOnDestroy(){
      if(this.subscription)
      this.subscription.unsubscribe();
      if(this.homeSubscription)
      this.homeSubscription.unsubscribe();
      if(this.fetchSubscription)
      this.fetchSubscription.unsubscribe();
    }

}
