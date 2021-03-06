import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ContactModel } from './contact.model';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy{

  isAuthenticated : boolean = false;
  subscription : Subscription;
  editMode : boolean = false;
  contactSubscription : Subscription;
  fetchContactSubscription : Subscription;
  contact : ContactModel[] = [];
  loading : boolean = false;
  changesMade : boolean = false;
  error : string =null;

  constructor(private authService : AuthService,private ref : ChangeDetectorRef,
    private contactService :ContactService) { }

  ngOnInit(): void {
    this.subscription = this.authService.user.subscribe(user => {
      this.isAuthenticated=!!user;
      this.ref.detectChanges();
  })
  this.onFetch();
}

deleteContact(){
  this.contact.pop();
  this.changesMade = true ;
  this.editMode = true;
}

addContact(){
  this.contact.push(new ContactModel("",""));
  this.editMode = true;
  this.changesMade = true;
}

onSave(){
  if(this.changesMade){
    this.loading=true;
    this.contactSubscription = this.contactService.onSaveContact(this.contact).subscribe(res => {
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
    this.fetchContactSubscription = this.contactService.onFetchContact().subscribe(res  => {
      if(res)
      this.contact=res;
      else{
        this.contact=[];
      }
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
    if(this.contactSubscription)
    this.contactSubscription.unsubscribe();
    if(this.fetchContactSubscription)
    this.fetchContactSubscription.unsubscribe();
  }

}
