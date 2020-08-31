import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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


const appRoutes:Routes = [
  
  {path:'users',component:DetailDashboardComponent,children:[
    {path:':id',component:SideMenuComponent}]
  // {path:'1',component:ProjectDashboard2Component},
  // {path:'2',component:ProjectDashboard3Component},
  }]
@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    ProjectDashboardComponent,
    ProjectDashboard2Component,
    ProjectDashboard3Component,
    DetailDashboardComponent,
    SideMenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
