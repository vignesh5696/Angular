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
  contact : ContactModel[];

  constructor(private authService : AuthService,private ref : ChangeDetectorRef,
    private contactService :ContactService) { }

  ngOnInit(): void {
    this.subscription = this.authService.user.subscribe(user => {
      this.isAuthenticated=!!user;
      this.ref.detectChanges();
  })
  this.onFetch();
}

onSave(){
  this.contactSubscription = this.contactService.onSaveContact(this.contact).subscribe(res => {
    console.log(res);
  },error => {
    console.log(error);
  });
  this.editMode=false;
  }

  onFetch(){
    this.contactService.onFetchContact().subscribe(res  => {
      this.contact=res;
    },error => {
      console.log(error);
    });
  }

  ngOnDestroy(){
    if(this.subscription)
    this.subscription.unsubscribe();
    if(this.contactSubscription)
    this.contactSubscription.unsubscribe();
  }

}
