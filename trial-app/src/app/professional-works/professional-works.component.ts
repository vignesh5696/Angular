import { Component, OnInit } from '@angular/core';
import { ProfessionalWorksModel } from './professional-works.model';

@Component({
  selector: 'app-professional-works',
  templateUrl: './professional-works.component.html',
  styleUrls: ['./professional-works.component.css']
})
export class ProfessionalWorksComponent implements OnInit {

  showTimeline = false;

  Organisations : ProfessionalWorksModel[] = [
    new ProfessionalWorksModel("Infoview Technologies pvt. ltd","Junior Engineer","2017 - Till date",
    "Java")
  ]
  constructor() { }

  ngOnInit(): void {
  }

  collapse(element : HTMLElement){
    element.className= element.className=="panel-body collapse in" ? "panel-body collapse" :"panel-body collapse in"
  }

  toggleTimeline(){
    this.showTimeline=!this.showTimeline;
  }

}
