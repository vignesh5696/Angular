import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ExcelService } from '../excel.service';

@Component({
  selector: 'app-structural-view',
  templateUrl: './structural-view.component.html',
  styleUrls: ['./structural-view.component.css']
})
export class StructuralViewComponent implements OnInit {

  check : string
  level0 : {name :string,count:string};
  level1 :{project : string,count:string,PMO : string}[] ;
  level2 : {project : string, PMO:string,count:string, subModules : string}[] ;
  level3 : {PMO : string, subModules:string}[];
  Value : number = 100;
  Percentage : string = this.Value + "%";


  constructor(private router : Router,private excelService : ExcelService,private _snackBar: MatSnackBar)
   { }

  ngOnInit(): void {
    this.onComboChange("Dev View");
  }

  onProfileClick(userName : string){
    this.router.navigate(['/user'],{queryParams:{profile:userName}});
  }

  onZoomIn(){
    this.Value = this.Value + 2; 
    this.Percentage = this.Value + "%";
  }

  onZoomOut(){
    this.Value = this.Value - 2; 
    this.Percentage = this.Value + "%";
  }

  exportAsPdf(){
    var element = document.getElementById('org-chart');
    window.scrollTo(0,0);
    this._snackBar.open("Downloading Organisation Structure in Pdf format", "", {
      duration: 3000,
      verticalPosition: 'bottom', 
      horizontalPosition: 'left'
    });
    html2canvas(element).then((canvas) => {
      var imgdata = canvas.toDataURL('image/png');
      var doc = new jsPDF();
      var imgHeight = canvas.height * 208/canvas.width;
      doc.addImage(imgdata,0,10,208,imgHeight);
      doc.save("Organisation_Structure.pdf");
    })
  }

  getSubModule(PMOParam : string,lastChild : HTMLElement){
    this.check="";
    this.level3.map(subModule => {
      if(subModule.PMO == PMOParam){
        this.check = subModule.subModules.replace(/,/g,'\n');
      }
    })
    lastChild.innerText = this.check;
  }

  onComboChange(combo : string){
  window.scrollTo(0,0);
  if(combo == "HR View"){
    this.level0 = {name:"Cheran",count:"1173"};
    this.level1 =  [
      {project : "Suresh kumar",count:"201",PMO:"Raj Mohan, Karthick"},
      {project : "RajMohan",count:"368",PMO:"Suresh, Balakrishnan"},
      {project : "Karthick",count:"186",PMO:"Sathyanarayana,Gunasekaran"},
      {project : "Sathyanarayana",count:"186",PMO:"Sathyanarayana,Gunasekaran"},
      {project : "ManickRaja",count:"186",PMO:"Sathyanarayana,Gunasekaran"},
      {project : "Balakrishnan",count:"186",PMO:"Sathyanarayana,Gunasekaran"},
      {project : "Gunasekaran",count:"186",PMO:"Sathyanarayana,Gunasekaran"},
      {project : "Management",count:"5",PMO:null},
      {project : "Prakash",count:"186",PMO:"Sathyanarayana,Gunasekaran"},
      {project : "Bubesh",count:"186",PMO:"Sathyanarayana,Gunasekaran"},
      {project : "Finance",count:"3",PMO:null},
      {project : "SOP",count:"2",PMO:null},
    ];
    this.level2 = [
      {project : "Suresh kumar",PMO:"SCM DEV",count:"197", subModules:null},
      {project : "Suresh kumar",PMO:"AC-SCM IFDM",count:"4", subModules:null},
      {project : "RajMohan",PMO:"AC Pattern - 0",count:"34", subModules:null},
      {project : "RajMohan",PMO:"AC Pattern - 2",count:"141", subModules:null},
      {project : "RajMohan",PMO:"AC Pattern - 3",count:"193", subModules:null},
      {project : "RajMohan",PMO:"RUT",count:"2", subModules:null},
      {project : "Karthick",PMO:"SCM Dev",count:"67", subModules:null},
      {project : "Karthick",PMO:"AC Pattern - 1",count:"58", subModules:null},
      {project : "Karthick",PMO:"AC Pattern - 3",count:"130", subModules:null},
      {project : "Karthick",PMO:"Human Resource",count:"4", subModules:null},
      {project : "Karthick",PMO:"RUT",count:"3", subModules:null},
      {project : "Sathyanarayana",PMO:"HR Dev",count:"125", subModules:null},
      {project : "ManickRaja",PMO:"SCM Dev",count:"36", subModules:null},
      {project : "Balakrishnan",PMO:"SCM Hyouka",count:"98", subModules:null},
      {project : "Gunasekaran",PMO:"SCM Hyouka",count:"61", subModules:null},
      {project : "Prakash",PMO:"Admin",count:"4", subModules:null},
      {project : "Bubesh",PMO:"Admin",count:"6", subModules:null},
    ];
  }

  if(combo == "Dev View"){
    this.level0 = {name:"Cheran",count:"1413"};
    this.level1 =  [
      {project : "AC",count:"642",PMO:"Raj Mohan, Karthick"},
      {project : "SCM",count:"450",PMO:"Suresh, Balakrishnan"},
      {project : "HR (WHI)",count:"186",PMO:"Sathyanarayana,Gunasekaran"},
    ];
    this.level2 = [
      {project : "AC",PMO:"Raj Mohan",count:"420", subModules:`AC CI - 3, AC Customer Support - 3, CWS - Expense - 33, PMO Team - 1, AC Tools - 5, AC COM - 25, CFM Expense - 3, Asset - 26, Treasury - 16, Purchase - 16, Quality Control - 28,Operational Auto Test - 25, Screen Navigation Auto Test - 20, Small Size screen Test - 196,Auto Test Script Assess - 20`},
      {project : "AC",PMO:"Karthick",count:"222", subModules:`CFW - 34, CFW QE - 12, Treasury - 24, Hue Client - Hue Web Test - 132, Licence Change - IC - 20 `},
      {project : "SCM",PMO:"Suresh",count:"342", subModules:`Sales - 35,PP - 45,IV/SCM COM - 52,Cost - 50,Project1 - 75,Project3 - 30,Functional BT - 46,SCM Cl - 5,SCM Clover - 4,`},
      {project : "SCM",PMO:"Balakrishnan",count:"107", subModules:`Sales - 10, PP - 12, IV/SCMCOM - 9, Cost - 10, Project1 - 10, Project2 - 10, Project3 - 6, Functional BT - 21, QE - 17, QC - 2, `},
      {project : "HR (WHI)",PMO:"Sathyanarayana",count:"124", subModules:`Attendance - 21, HR Core - 26, Payroll - 37, Customer Support - 8, Talent Management - 20, Technical Service - 6, HR CI - 3, Clover - 3, `},
      {project : "HR (WHI)",PMO:"Gunasekaran",count:"61", subModules:`Attendance - 9, HR Core - 13, Payroll - 11, QE - 15, Talent Management - 7, Recruiting - 5 `}
    ];
    this. level3  = [
      {PMO:"Raj Mohan", subModules:`AC CI - 3, AC Customer Support - 3, CWS - Expense - 33, PMO Team - 1, AC Tools - 5, AC COM - 25, CFM Expense - 3, Asset - 26, Treasury - 16, Purchase - 16, Quality Control - 28,Operational Auto Test - 25, Screen Navigation Auto Test - 20, Small Size screen Test - 196,Auto Test Script Assess - 20`},
      {PMO:"Karthick", subModules:`CFW - 34, CFW QE - 12, Treasury - 24, Hue Client - Hue Web Test - 132, Licence Change - IC - 20 `},
      {PMO:"Suresh",subModules:`Sales - 35,PP - 45,IV/SCM COM - 52,Cost - 50,Project1 - 75,Project3 - 30,Functional BT - 46,SCM Cl - 5,SCM Clover - 4,`},
      {PMO:"Balakrishnan",subModules:`Sales - 10, PP - 12, IV/SCMCOM - 9, Cost - 10, Project1 - 10, Project2 - 10, Project3 - 6, Functional BT - 21, QE - 17, QC - 2 `},
      {PMO:"Sathyanarayana", subModules:`Attendance - 21, HR Core - 26, Payroll - 37, Customer Support - 8, Talent Management - 20, Technical Service - 6, HR CI - 3, Clover - 3 `},
      {PMO:"Gunasekaran",subModules:`Attendance - 9, HR Core - 13, Payroll - 11, QE - 15, Talent Management - 7, Recruiting - 5 `}
    ];
  }
    
  }

}
