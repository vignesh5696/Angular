import { Component, Output,EventEmitter, OnInit, OnDestroy, DoCheck, ChangeDetectorRef } from '@angular/core';
import { dataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy,DoCheck{
    private subsciption: Subscription;
    isAuthenticated  = false;
    // @Output() featureSelected = new EventEmitter<string> ();
    // onSelect(feature:string){
    //     this.featureSelected.emit(feature);
    // }
    constructor(private dataStorageService : dataStorageService, private authService : AuthService,
        private ref :ChangeDetectorRef){}

    ngOnInit(){
       this.subsciption = this.authService.user.subscribe(user => {
           this.isAuthenticated = !!user;
           this.ref.detectChanges();
       });
    }

    ngDoCheck(){
        // this.subsciption = this.authService.user.subscribe(user => {
        //     this.isAuthenticated = !!user;
        // });
    }
    onSaveData(){
        this.dataStorageService.storeRecipes();
    }

    onFetchData(){
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout(){
        this.authService.logout();
    }

    ngOnDestroy(){
        this.subsciption.unsubscribe();
    }
}