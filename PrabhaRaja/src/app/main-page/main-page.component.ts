import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { delay, map,startWith } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { DataService, poemModel } from '../data.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit,OnDestroy {

  myControl = new FormControl();
  options:string[]=['Friendship','Love','Nature','Sad'];
  filteredOptions : Observable<string[]>=new Observable;
  subscription : Subscription =  new Subscription;
  createNew:boolean =false;
  isAuthenticated:boolean = false;
  // loading  : boolean = false;

  constructor(private dataService : DataService,private authService : AuthService,
    private ref : ChangeDetectorRef) { }

  ngOnInit(): void {
    //  this.dataService.emitLoading.subscribe(res => {
    //   // this.loading=res;
    //   console.log(res)
    // });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),map(value => {
        this.dataService.filterPoems(value);
        return this._filter(value)
      })
    );
    this.subscription = this.authService.user.subscribe(user =>{
      this.isAuthenticated = !(user.token==null);
      this.ref.detectChanges();
    });
  }

  private _filter(value : string) : string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  switchMode() {
    this.createNew=!this.createNew;
  }

  onCreate() {
    this.createNew=!this.createNew;
  }

  ngOnDestroy() {
  }

}
