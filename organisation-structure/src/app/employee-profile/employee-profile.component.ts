import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {

  constructor(private route : ActivatedRoute) { }

  empName : string ;
  empId : string;
  empDesignation : string;
  empImage : string;

  empData = [
    {empName:"Rajmohan Natesan",empId:"35",empDesignation:"PMO",empImage : "url(../../assets/Rajmohan.jpg)"},
    {empName:"Karthick Raj Jayaraman",empId:"45",empDesignation:"PMO",empImage : "url(../../assets/Karthick.jpg)"}
  ];
  ngOnInit(): void {
    this.empName = this.route.snapshot.queryParams['profile'];
    this.empData.forEach(element => {
      if(element.empName === this.empName){
        this.empId = element.empId;
        this.empDesignation = element.empDesignation;
        this.empImage = element.empImage;
      }
    });
  }

  // getImage(){
  //   return "url(../../assets/pp.jpg)";
  // }

}
