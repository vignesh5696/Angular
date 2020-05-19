import { Component, OnInit, ElementRef } from '@angular/core';
import { ContactModel } from '../contact/contact.model';
import { EduModel } from './edu.model';

@Component({
  selector: 'app-edu',
  templateUrl: './edu.component.html',
  styleUrls: ['./edu.component.css']
})
export class EduComponent implements OnInit {

  qualifications : EduModel[] = [
    new EduModel("Bachelor of Engineering (Electronics and Communication Engineering)","Sri Ramakrishna Institute of Technology","2017", "80%"),
    new EduModel("HSC","Kadri Mills Higher Secondary School", "2013" , "92%"),
    new EduModel("SSC","Government Boys Higher Secondary School", "2011","97%")
  ];
  constructor() { }

  ngOnInit(): void {
  }

  collapse(element : HTMLElement){
    element.className= element.className=="panel-body collapse in" ? "panel-body collapse" :"panel-body collapse in"
  }

}
