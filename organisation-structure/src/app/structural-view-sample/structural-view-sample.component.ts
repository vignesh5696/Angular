import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelService } from '../excel.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-structural-view-sample',
  templateUrl: './structural-view-sample.component.html',
  styleUrls: ['./structural-view-sample.component.css']
})

export class StructuralViewSampleComponent implements OnInit {
  Value : number = 100;
  Percentage : string = this.Value + "%";

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
    { id: '1200', employee: 'Jack', Designation:'Developer',devleader: 'Yogeshwari', groupleader :'Pradeep',projectleader:'RajMohan',project:'Facebook1'},
    { id: '1300', employee: 'Jack', Designation:'Developer',devleader: 'Yogeshwari', groupleader :'Pradeep',projectleader:'RajMohan',project:'Jio1'}
  ];

  constructor(private router : Router,private excelService : ExcelService,private _snackBar: MatSnackBar)
   { }

  ngOnInit(): void {
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

  exportAsXLSX(){
    this._snackBar.open("The File is downloading now", "", {
      duration: 2000,
      verticalPosition: 'bottom', 
      horizontalPosition: 'left'
    });
      this.excelService.exportAsExcelFile(this.rowData, 'Employee Details');

  }

}
