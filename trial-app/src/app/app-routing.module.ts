import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { MyworksComponent } from './myworks/myworks.component';
import { ExtraworksComponent } from './extraworks/extraworks.component';
import { ProfessionalWorksComponent } from './professional-works/professional-works.component';
import { EduComponent } from './edu/edu.component';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';

const appRoute : Routes = [
    {path:"workexperience" ,component : ProfessionalWorksComponent},
    {path:"edu" ,component :  EduComponent},
    {path:"myworks" ,component : MyworksComponent},
    {path:"others" ,component : ExtraworksComponent},
    {path:"contact" ,component : ContactComponent},
    {path:"auth" ,component : AuthComponent},
    {path:"home" ,component : AppComponent},
    {path:"**" ,redirectTo:"home"}
  ];
@NgModule({
    imports:[RouterModule.forRoot(appRoute)],
    exports:[RouterModule]
})

export class AppRoutingModule{

}