import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface project{
    name:string,
    ResourceCount: number
  }

@Injectable({providedIn:'root'})
export class ProjectService{
    projects :project[];
    constructor(private http: HttpClient){
    }

    // getProjectData() : project[]{
    //     this.http.get<project[]>("https://organisation-structure.firebaseio.com/Project.json").
    //     subscribe(Res => {
    //        this.projects=[...Res];
    //     //    return Res;
    //     });
    //     return this.projects;
    // }

    fetchedData(data:project){
        // this.projects=data;
    }
}