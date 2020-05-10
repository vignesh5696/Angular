import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { AuthGuardService } from '../auth/auth/auth-guard.service';
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeResolverService } from './recipe-resolver.service';


const appRoute:Routes = [
    {path:"" , component:RecipesComponent, canActivate:[AuthGuardService], children : [
        {path:"" , component:RecipeStartComponent},
        {path:"new" , component:RecipeEditComponent},
        {path:":id" , component:RecipeDetailComponent , resolve:[RecipeResolverService]},
        {path:":id/edit" , component:RecipeEditComponent, resolve:[RecipeResolverService]}

    ]}
  ];

@NgModule({
    imports:[RouterModule.forChild(appRoute)],
    exports:[RouterModule]
})
export class RecipesRoutingModule{

}