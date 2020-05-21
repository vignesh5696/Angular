import { Component, OnInit,  ChangeDetectorRef, OnDestroy } from '@angular/core';
import { EduModel } from './edu.model';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { EduService } from './edu.service';

@Component({
  selector: 'app-edu',
  templateUrl: './edu.component.html',
  styleUrls: ['./edu.component.css']
})
export class EduComponent implements OnInit, OnDestroy {

  isAuthenticated : boolean = false;
  subscription : Subscription;
  eduSubscription : Subscription;
  fetchSubscription : Subscription;
  editMode : boolean = false;
  loading : boolean = false;
  changesMade : boolean = false;
  error : string = null;

  qualifications : EduModel[] = [
    // new EduModel("Bachelor of Engineering (Electronics and Communication Engineering)","Sri Ramakrishna Institute of Technology","2017", "80%"),
    // new EduModel("HSC","Kadri Mills Higher Secondary School", "2013" , "92%"),
    // new EduModel("SSC","Government Boys Higher Secondary School", "2011","97%")
  ];
  constructor(private authService : AuthService, private ref : ChangeDetectorRef,
    private eduService : EduService) { }

  ngOnInit(): void {
    this.subscription = this.authService.user.subscribe(user => {
      this.isAuthenticated=!!user;
      this.ref.detectChanges();
    })
    this.onFetch();
  }

  addQualification(){
    this.qualifications.push(new EduModel("","","",""));
    this.changesMade = true ;
    this.editMode = true;
  }

  deleteQualification(){
    this.qualifications.pop();
    this.changesMade = true ;
  }

  onCancel(){
    if(!this.changesMade){
      this.editMode = false;
    }else{
      this.error = "Do you want to proceed without saving the changes?"
    }
  }

  onOk(){
    this.onFetch();
    this.error=null;
    this.editMode=false;
  }

  onSave(){
    if(this.changesMade){
      this.loading=true;
      this.eduSubscription=this.eduService.onSaveEdu(this.qualifications).subscribe(res => {
      this.loading=false;
      },err => {
        console.log(err);
      this.loading=false;
      });
      this.editMode = false;
    }else{
      console.log("No changes")
    }
    this.changesMade=false;
  }

  onFetch(){
    this.loading = true;
    this.changesMade=false;
    this.fetchSubscription = this.eduService.onFetchEdu().subscribe(res => {
    if(res)
    this.qualifications=res;
    else{
      this.qualifications=[];
    }
    this.loading=false;
  },error => {
    console.log(error);
    this.loading = false;
  })
  }

  collapse(element : HTMLElement){
    element.className= element.className=="panel-body collapse in" ? "panel-body collapse" :"panel-body collapse in"
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
    if(this.eduSubscription){
      this.eduSubscription.unsubscribe();
    }
    if(this.fetchSubscription){
      this.fetchSubscription.unsubscribe();
    }
  }

}
