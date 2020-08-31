import { Component, OnInit,Input } from '@angular/core';
import { ProjectService } from './project.service';


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

  title = 'organisation-structure';
  searchFilter:string = '';
  projects : project[]=[
    {name:"WAP",ResourceCount:600},
    {name:"BitKey",ResourceCount:600},
    {name:"Vaken",ResourceCount:600},
    {name:"Google",ResourceCount:600},
    {name:"Facebook",ResourceCount:0},
    {name:"Jio",ResourceCount:0}
];

 modules : modules[] =[
   {projectName:"WAP",moduleName : "AC" , moduleCount:200},
   {projectName:"WAP",moduleName : "SCM" , moduleCount:200},
   {projectName:"WAP",moduleName : "HR" , moduleCount:200},
   {projectName:"BitKey",moduleName : "Bitkey" , moduleCount:600},
   {projectName:"Vaken",moduleName : "New Project" , moduleCount:600},
   {projectName:"Google",moduleName : "Project 1" , moduleCount:300},
   {projectName:"Google",moduleName : "Project 2" , moduleCount:300}
 ]; 

constructor(private projectService : ProjectService){}
  ngOnInit(){
    // this.onProjectFetch();
  }
  getImage(projectName : string){
    return "../assets/"+projectName+".jpg";
  }

  onProjectFetch(){
    // this.projects=[...this.projectService.getProjectData()];
    // console.log(this.projectService.getProjectData());
  }

}
