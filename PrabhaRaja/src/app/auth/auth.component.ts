import { Component, OnInit, ComponentFactoryResolver, ComponentFactory, ViewChild, OnDestroy, ViewContainerRef, Directive, TemplateRef, EmbeddedViewRef, ComponentRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { Subscription, BehaviorSubject } from 'rxjs';

import { User } from './user.model';
import { AuthService } from './auth.service';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit,OnDestroy {

  loading=false;
  error=false;
  authSubscription : Subscription=new Subscription;

  constructor(private http : HttpClient, private router : Router,
    private companyFactoryResolver : ComponentFactoryResolver,
    private authService : AuthService) { }
    // @ViewChild(PlaceholderDirective,{static:false}) alertHost : PlaceholderDirective = new Directive;

  ngOnInit(): void {
  }

  onSubmit(form : NgForm){
    const email= form.value.email;
    const password = form.value.password;
    this.loading=true;
    this.authSubscription=this.authService.login(email,password).subscribe(resData => {
      this.loading=false;
      this.error=false;
      this.router.navigate(['/']);
    },errorData => {
      this.loading=false;
      this.error=true;
    })
  }

  ngOnDestroy() {
    if(this.authSubscription)
    this.authSubscription.unsubscribe();
  }
}
