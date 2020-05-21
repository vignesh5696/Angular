import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ProfessionalWorksModel } from './professional-works.model';
import { AuthService } from '../auth/auth.service';
import { ProfessionalWorksService } from './professional-works.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-professional-works',
  templateUrl: './professional-works.component.html',
  styleUrls: ['./professional-works.component.css']
})
export class ProfessionalWorksComponent implements OnInit, OnDestroy {

  showTimeline : boolean = false;
  isAuthenticated : boolean = false;
  editMode : boolean = false;
  changesMade : boolean = false;
  loading : boolean = false;
  error : string = null;
  subscription : Subscription;
  saveSubscription : Subscription;
  fetchSubscription : Subscription;

  Organisations : ProfessionalWorksModel[] = [
    // new ProfessionalWorksModel("Infoview Technologies pvt. ltd","Junior Engineer","2017 - Till date",
    // "Java")
  ]
  constructor(private authService : AuthService,private ref : ChangeDetectorRef,
    private professionalWorksService : ProfessionalWorksService) { }

  ngOnInit(): void {
   this.subscription = this.authService.user.subscribe(user =>{
      this.isAuthenticated = !!user;
      this.ref.detectChanges();
    });
    this.onFetch();
  }

  collapse(element : HTMLElement){
    element.className= element.className=="panel-body collapse in" ? "panel-body collapse" :"panel-body collapse in"
  }

  toggleTimeline(){
    this.showTimeline=!this.showTimeline;
  }

  onCancel(){
    if(!this.changesMade)
    this.editMode = false;
    else{
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
    this.saveSubscription = this.professionalWorksService.onSaveProfessionalworks(this.Organisations).subscribe(res =>{
      this.loading = false;
    },err => {
      console.log(err);
      this.loading= false;
    });}else{
      console.log("No changes")
    }
    this.editMode=false;
    this.changesMade=false;
  }

  onFetch(){
    this.loading=true;
    this.fetchSubscription = this.professionalWorksService.onFetchProfessionalworks().subscribe(res => {
      this.Organisations = res.slice(0,1)[0];
      this.loading = false;
    },err => {
      console.log(err);
      this.loading = false;
    });
  }

  ngOnDestroy(){
    if(this.subscription)
    this.subscription.unsubscribe();
    if(this.saveSubscription)
    this.saveSubscription.unsubscribe();
    if(this.fetchSubscription)
    this.fetchSubscription.unsubscribe();
  }

}
