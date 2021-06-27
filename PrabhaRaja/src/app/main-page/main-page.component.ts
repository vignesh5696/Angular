import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map,startWith } from 'rxjs/operators';
import { DataService, poemModel } from '../data.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  myControl = new FormControl();
  options:string[]=['Friendship','Love','Nature','Sad'];
  filteredOptions : Observable<string[]>=new Observable;
  createNew:boolean=false;

  constructor(private dataService : DataService) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),map(value => this._filter(value))
    );
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

}
