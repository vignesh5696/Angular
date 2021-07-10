import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export interface workModel {
    companyName : string,
    workingYears : string,
    role : string,
    technologies:string
}
export interface educationModel {
  schoolName :  string,
  degree : string,
  studiedYear : string,
  percentage : string
}

@Component({
  selector: 'app-about-me' ,
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {

  works : workModel[] = [   
    // {companyName : "wipro",
    // workingYears : "2",
    // role : "test",
    // technologies:"string"},
    // {companyName : "wipro",
    // workingYears : "2",
    // role : "test",
    // technologies:"string"},
    // {companyName : "wipro",
    // workingYears : "2",
    // role : "test",
    // technologies:"string"}
  ];
  educations : educationModel[] = [
    // {
    //   schoolName :  "Sri Ramakrishna Institute of Technology",
    //   degree : "B.E - ECE",
    //   studiedYear : "2017",
    //   percentage : "80%"
    // },
    // {
    //   schoolName :  "Kongu vellalar matriculation Hr. Sec. school",
    //   degree : "Higher Secondary",
    //   studiedYear : "2013",
    //   percentage : "95%"
    // }
  ];
  loading = false;
  linkedInId : string ="";
  mailId : string="";

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.loading=true;
    this.http.get<[]>('https://prabha-raja-default-rtdb.firebaseio.com/works.json')
    .subscribe(res => {
      this.loading=false;
        this.works=res;
    },err => {
      this.loading=false;
    });
    this.http.get<[]>('https://prabha-raja-default-rtdb.firebaseio.com/edu.json')
    .subscribe(res => {
      this.loading=false;
        this.educations=res;
    },err => {
      this.loading=false;
    });
    this.http.get<string>('https://prabha-raja-default-rtdb.firebaseio.com/linkedInId.json')
    .subscribe(res => {
      this.loading=false;
        this.linkedInId=res;
    },err => {
      this.loading=false;
    });
    this.http.get<string>('https://prabha-raja-default-rtdb.firebaseio.com/mailId.json')
    .subscribe(res => {
      this.loading=false;
        this.mailId=res;
    },err => {
      this.loading=false;
    });
  }

  // onSave() {
  //   this.http.put<[]>('https://prabha-raja-default-rtdb.firebaseio.com/edu.json',this.educations)
  //   .subscribe(res => {

  //   });
  // }
}
