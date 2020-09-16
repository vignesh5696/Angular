import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { ProjectService } from './project.service';
import { Router } from '@angular/router';
import { IndexoutletComponent } from '../indexoutlet/indexoutlet.component'
import { ExcelService } from '../excel.service';
import { MatSnackBar } from '@angular/material/snack-bar';


interface project{
  name:string,
  ResourceCount: number
}
interface modules{
  projectName : string,
  moduleName  : string,
  moduleCount : number
}

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.css']
})
export class ProjectDashboardComponent implements OnInit {

  count = 0;
  searchFilter:string = '';
  projects : project[]=[
    {name:"WAP",ResourceCount:600},
    {name:"BitKey",ResourceCount:600},
    {name:"Vaken",ResourceCount:600},
    {name:"Google",ResourceCount:600},
    {name:"Facebook",ResourceCount:200},
    {name:"Jio",ResourceCount:600},
    {name:"Soft Bank",ResourceCount:300},
    {name:"Paypal",ResourceCount:300}
];

 modules : modules[] =[
   {projectName:"WAP",moduleName : "AC" , moduleCount:200},
   {projectName:"WAP",moduleName : "SCM" , moduleCount:200},
   {projectName:"WAP",moduleName : "HR" , moduleCount:200},
   {projectName:"BitKey",moduleName : "Bitkey1" , moduleCount:200},
   {projectName:"BitKey",moduleName : "Bitkey2" , moduleCount:200},
   {projectName:"BitKey",moduleName : "Bitkey3" , moduleCount:200},
   {projectName:"Vaken",moduleName : "New Project" , moduleCount:600},
   {projectName:"Google",moduleName : "Project 1" , moduleCount:300},
   {projectName:"Google",moduleName : "Project 2" , moduleCount:300},
   {projectName:"Facebook",moduleName : "Bitkey3" , moduleCount:200},
   {projectName:"Jio",moduleName : "New Project" , moduleCount:600},
   {projectName:"Soft Bank",moduleName : "Project 1" , moduleCount:300},
   {projectName:"Paypal",moduleName : "Project 2" , moduleCount:300}
 ]; 

 rowData = [
  { id: '100', employee: 'John', Designation:'Developer',devleader: 'Yogeshwari', groupleader :'Pradeep',projectleader:'RajMohan',project:'WAP'},
  { id: '200', employee: 'Michael',Designation:'Developer',devleader: 'Yogeshwari', groupleader:'Pradeep',projectleader:'RajMohan',project:'BitKey'},
  { id: '300', employee: 'Kumar',Designation:'Developer', devleader: 'Yogeshwari', groupleader :'Pradeep',projectleader:'RajMohan',project:'WAP'},
  { id: '400', employee: 'Trump', Designation:'Developer',devleader: 'Yogeshwari', groupleader :'Pradeep',projectleader:'RajMohan',project:'WAP'},
  { id: '500', employee: 'Lawson',Designation:'Developer', devleader: 'Yogeshwari', groupleader :'Pradeep',projectleader:'RajMohan',project:'BitKey'},
  { id: '600', employee: 'Jack', Designation:'Developer',devleader: 'Yogeshwari', groupleader :'Pradeep',projectleader:'RajMohan',project:'WAP'},
  { id: '700', employee: 'John', Designation:'Developer',devleader: 'Yogeshwari', groupleader :'Pradeep',projectleader:'RajMohan',project:'BitKey'},
  { id: '800', employee: 'Michael',Designation:'Developer',devleader: 'Yogeshwari', groupleader:'Pradeep',projectleader:'RajMohan',project:'Vaken'},
  { id: '900', employee: 'Kumar',Designation:'Developer', devleader: 'Yogeshwari', groupleader :'Pradeep',projectleader:'RajMohan',project:'Google'},
  { id: '1000', employee: 'Trump', Designation:'Developer',devleader: 'Yogeshwari', groupleader :'Pradeep',projectleader:'RajMohan',project:'Facebook'},
  { id: '1100', employee: 'Lawson',Designation:'Developer', devleader: 'Yogeshwari', groupleader :'Pradeep',projectleader:'RajMohan',project:'Jio'},
  { id: '1200', employee: 'Jack', Designation:'Developer',devleader: 'Yogeshwari', groupleader :'Pradeep',projectleader:'RajMohan',project:'Soft Bank'},
  { id: '1300', employee: 'Jack', Designation:'Developer',devleader: 'Yogeshwari', groupleader :'Pradeep',projectleader:'RajMohan',project:'Paypal'}
];
constructor(private projectService : ProjectService, private route : Router,
  private excelService : ExcelService,private _snackBar: MatSnackBar){}

  ngOnInit(){
    // this.onProjectFetch();
  }
  getImage(projectName : string){
    return "../assets/"+projectName+".jpg";
  }

  getModuleCount(projectName : string){
    this.count=0;
    this.modules.map((module)=>{
      if(module.projectName === projectName)
       this.count++;
    });
    return this.count;
  }

  onCardDoubleClick(project : project){
    this.route.navigate(['users'],{queryParams:{project:project.name}});
  }

  showOrganisationStructure(){
    this.route.navigate(['organisation-structure']);
  }

  showList(){
    this.route.navigate(['employees']);
  }

  onCardDownload(projectName : string){
    let temp=[];
    this.rowData.map(ele => {
      if(ele.project===projectName){
        temp.push(ele);
      }
    });
    this._snackBar.open("The File is downloading now", "", {
    duration: 2000,
    verticalPosition: 'bottom', 
    horizontalPosition: 'left'
  });
    this.excelService.exportAsExcelFile(temp, 'Employee Details');
  }
}
