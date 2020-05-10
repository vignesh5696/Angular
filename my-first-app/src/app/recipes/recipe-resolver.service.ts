import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { dataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({
    providedIn:'root'
})
export class RecipeResolverService implements Resolve<Recipe[]>{
    constructor(private dataStorageService : dataStorageService, private recipeService :RecipeService){}
    resolve(route : ActivatedRouteSnapshot,
        state : RouterStateSnapshot){
            if(this.recipeService.getRecipes().length==0){
                return this.dataStorageService.fetchRecipes();
            }
            return this.recipeService.getRecipes();
    }
}