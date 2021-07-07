import { getLocaleDateFormat } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataService, poemModel } from '../data.service';

@Component({
  selector: 'app-new-poem',
  templateUrl: './new-poem.component.html',
  styleUrls: ['./new-poem.component.css']
})
export class NewPoemComponent implements OnInit,OnDestroy {
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<void>();
  @Output() newTitle = new EventEmitter<void>();

  myTitle = new FormControl();
  myPoem = new FormControl();
  error : boolean = false;
  options:string[]=['Friendship','Love','Nature','Sad'];
  filteredOptions : Observable<string[]>=new Observable;
  saveSubscription : any;
  newPoemData : poemModel={
    Id : 0,
    Header : "",
    Date : this.getDate(),
    Content : "",
    likeCount : 0,
    likedAccount : [],
    liked : false
  };

  constructor(private dataService : DataService) { }

  ngOnInit(): void {
  this.filteredOptions = this.myTitle.valueChanges.pipe(
    startWith(''),map(value => this._filter(value))
  );
  }

  private _filter(value : string) : string[] {
  const filterValue = value.toLowerCase();
  return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  getDate() : string {
    var currentDate = new Date();
    return currentDate.getDate() +"/"+
     (currentDate.getMonth()+1) +"/"+ 
     currentDate.getFullYear()+" "+
     (currentDate.getHours()<10?'0':'')+currentDate.getHours()+":"+
     (currentDate.getMinutes()<10?'0':'')+currentDate.getMinutes()+":"+
     (currentDate.getSeconds()<10?'0':'')+currentDate.getSeconds();
  }

  onClose(){
      this.close.emit();
  }

  onOk(){
    if(this.myPoem.status == "INVALID" || this.myTitle.status == "INVALID") {
      this.error = true;
    } else {
      this.error = false;
      this.create.emit();
      this.newPoemData.Id = this.dataService.lastIdCount+1;
      this.newPoemData.Header = this.myTitle.value;
      this.newPoemData.Content = this.myPoem.value;
      this.newPoemData.likedAccount.push("");
      this.saveSubscription=this.dataService.addPoems(this.newPoemData).subscribe(res => {
        // console.log(res)
      },err=> {
        if(err.status==401)
        localStorage.clear();
      });
    }
  
}
  ngOnDestroy() {
    // this.saveSubscription.unsubscribe();
  }

}
