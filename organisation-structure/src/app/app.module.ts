import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {Routes,RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { FilterPipe } from './filter.pipe';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material-module';
import { ProjectDashboard2Component } from './project-dashboard2/project-dashboard2.component';
import { ProjectDashboard3Component } from './project-dashboard3/project-dashboard3.component';
import { DetailDashboardComponent } from './detail-dashboard/detail-dashboard.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { StructuralViewComponent } from './structural-view/structural-view.component';
import { StructuralViewSampleComponent } from './structural-view-sample/structural-view-sample.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { IndexoutletComponent } from './indexoutlet/indexoutlet.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AgGridModule } from 'ag-grid-angular';
import { ExcelService } from './excel.service';


const appRoutes:Routes = [
  {path:'users',component:DetailDashboardComponent,children:[
    {path:':id',component:SideMenuComponent}
  ]},
  {path:'organisation-structure',component:StructuralViewSampleComponent},
  { path: 'employees', component: IndexoutletComponent },
  { path: 'user', component: EmployeeProfileComponent },
  {path:'',component:ProjectDashboardComponent,pathMatch:'full'}
  ]
@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    ProjectDashboardComponent,
    ProjectDashboard2Component,
    ProjectDashboard3Component,
    DetailDashboardComponent,
    SideMenuComponent,
    StructuralViewComponent,
    StructuralViewSampleComponent,
    EmployeeProfileComponent,
    IndexoutletComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    RouterModule.forRoot(appRoutes),
    MatToolbarModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    AgGridModule.withComponents(null),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
