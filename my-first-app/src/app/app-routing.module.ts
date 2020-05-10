import { NgModule } from '@angular/core';
import { Routes,RouterModule, PreloadAllModules } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthComponent } from './auth/auth/auth.component';
import { RecipesRoutingModule } from './recipes/recipes-routing.module';


const appRoute:Routes = [
  {path:"" , redirectTo:"/recipes", pathMatch:"full"},
    {path:"auth" , component:AuthComponent},
    {path:"shopping-list" , component:ShoppingListComponent},
    {path:"recipes" , loadChildren : () => import('./recipes/recipes.module').then(m => m.RecipesModule)}
    // {path:"**" , redirectTo:"/recipes"}
  ];

@NgModule({
    imports:[RouterModule.forRoot(appRoute, {preloadingStrategy : PreloadAllModules})],
    exports:[RouterModule]
})
export class AppRoutingModule{

}