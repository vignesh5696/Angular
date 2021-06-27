import { getLocaleDateFormat } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataService, poemModel } from '../data.service';

@Component({
  selector: 'app-new-poem',
  templateUrl: './new-poem.component.html',
  styleUrls: ['./new-poem.component.css']
})
export class NewPoemComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<void>();
  @Output() newTitle = new EventEmitter<void>();

  myTitle = new FormControl();
  myPoem = new FormControl();
  error : boolean = false;
  options:string[]=['Friendship','Love','Nature','Sad'];
  filteredOptions : Observable<string[]>=new Observable;
  newPoemData : poemModel={
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
    return currentDate.getDate() +"/"+ (currentDate.getMonth()+1) +"/"+  currentDate.getFullYear();
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
      this.newPoemData.Header = this.myTitle.value;
      this.newPoemData.Content = this.myPoem.value;
      this.dataService.addPoems(this.newPoemData);
    }
  
 
}

}
