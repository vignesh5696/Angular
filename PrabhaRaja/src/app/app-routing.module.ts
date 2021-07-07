import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { AuthComponent } from './auth/auth.component';
import { MainPageComponent } from './main-page/main-page.component';


const appRoute : Routes = [

   {path:"auth" ,component : AuthComponent},
   {path:"me" ,component : AboutMeComponent},
   {path:"",component:MainPageComponent},
   {path:"**" ,redirectTo:""}
  ];
@NgModule({
    imports:[RouterModule.forRoot(appRoute)],
    exports:[RouterModule]
})

export class AppRoutingModule{

}