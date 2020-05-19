import { Component, OnInit, ComponentFactoryResolver, ComponentFactory, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { Subscription, BehaviorSubject } from 'rxjs';

import { User } from './user.model';
import { AuthService } from './auth.service';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  loading=false;
  alertSubscription : Subscription;

  constructor(private http : HttpClient, private router : Router,
    private companyFactoryResolver : ComponentFactoryResolver,
    private authService : AuthService) { }
    @ViewChild(PlaceholderDirective,{static:false}) alertHost : PlaceholderDirective 

  ngOnInit(): void {
  }

  onSubmit(form : NgForm){
    const email= form.value.email;
    const password = form.value.password;
    this.loading=true;
    this.authService.login(email,password).subscribe(resData => {
      this.loading=false;
      this.router.navigate(['/home']);
    },errorData => {
      this.loading=false;
      this.showAlert(errorData.error.error.message);
    })
  }

  showAlert(message : string){
    const alertFactoryResolver = this.companyFactoryResolver.resolveComponentFactory(AlertComponent);
    const viewref = this.alertHost.viewContainerRef;
    viewref.clear();
    const componentRef= viewref.createComponent(alertFactoryResolver);
    componentRef.instance.message=message;
    this.alertSubscription = componentRef.instance.close.subscribe(() => {
      this.alertSubscription.unsubscribe();
      viewref.clear();
    });
  }

  ngOnDestroy(){
    if(this.alertSubscription)
    this.alertSubscription.unsubscribe();
  }
}
