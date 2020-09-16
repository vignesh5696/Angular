import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-structural-view',
  templateUrl: './structural-view.component.html',
  styleUrls: ['./structural-view.component.css']
})
export class StructuralViewComponent implements OnInit {

  projects :{project : string}[] = [
    {project : "WAP"},
    {project : "BitKey"},
    {project : "Vaken"}
  ];

  Modules : {project : string, module:string}[] = [
    {project : "WAP",module:"AC"},
    {project : "WAP",module:"SCM"},
    {project : "BitKey",module:"HR"},

  ];

  PMOS : {module : string, PMO:string}[] = [
    {module : "AC",PMO:"RAJ"},
    {module : "AC",PMO:"Karthick"},
    {module : "HR",PMO:"Panneer"}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
