import { Component, OnInit,Input } from '@angular/core';
import { ProjectService } from '../project-dashboard/project.service';
import { ActivatedRoute, Router } from '@angular/router';


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
  selector: 'app-project-dashboard3',
  templateUrl: './project-dashboard3.component.html',
  styleUrls: ['./project-dashboard3.component.css']
})
export class ProjectDashboard3Component implements OnInit {

  count = 0;
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
   {projectName:"BitKey",moduleName : "Bitkey1" , moduleCount:200},
   {projectName:"BitKey",moduleName : "Bitkey2" , moduleCount:200},
   {projectName:"BitKey",moduleName : "Bitkey3" , moduleCount:200},
   {projectName:"Vaken",moduleName : "New Project" , moduleCount:600},
   {projectName:"Google",moduleName : "Project 1" , moduleCount:300},
   {projectName:"Google",moduleName : "Project 2" , moduleCount:300}
 ]; 

constructor(private projectService : ProjectService, private route : Router){}
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

}
