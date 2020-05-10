import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../../shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
 isLoginMode=true;
 isLoading = false;
 error : string = null;

 private closeSub : Subscription;
@ViewChild(PlaceholderDirective ,  {static : false}) alertHost : PlaceholderDirective;

  constructor(private authService : AuthService, private router : Router,
    private componentFactoryResolver : ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode;
  }

  onSubmit(form : NgForm){
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading= true;
    if(this.isLoginMode){
      this.authService.signin(email,password).subscribe(resData => {
        this.isLoading=false;
        this.router.navigate(['/recipes']);
      },
      errorMsg => {
        console.log(errorMsg);
        this.error=errorMsg;
        this.showErrorAlert(errorMsg);
        this.isLoading=false;
      });

    }else{
      this.authService.signup(email,password).subscribe(resData => {
        console.log(resData);
        this.isLoading=false;
        this.router.navigate(['/recipes']);
      },
      errorMsg => {
        console.log(errorMsg);
        this.error=errorMsg;
        this.showErrorAlert(errorMsg);
        this.isLoading=false;
      });
    }
    form.reset();

  }

  onHandleError(){
    this.error=null;
  }

  private showErrorAlert(error: string){
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const alertViewContainerRef = this.alertHost.viewContainerRef;
    alertViewContainerRef.clear();
    const componentRef = alertViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message= error;
    this.closeSub = componentRef.instance.close.subscribe(()=>{
      this.closeSub.unsubscribe();
      alertViewContainerRef.clear();
    });
  }

  ngOnDestroy(){
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }
}
