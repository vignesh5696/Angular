import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
// import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    // recipeSelected = new Subject<Recipe>();
    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[];
    // recipes: Recipe[] = [
    //     new Recipe('Test',
    //     'Testing',
    //     'https://get.pxhere.com/photo/dish-meal-food-produce-recipe-fish-breakfast-meat-pork-cuisine-steak-pork-chop-power-dishes-grilling-fried-food-604134.jpg',
    //     [
    //         new Ingredient("Meat" , 1),
    //         new Ingredient("Cheese" , 2)
    //     ]),
    //     new Recipe('Test 1',
    //     'Testing 1',
    //     'https://get.pxhere.com/photo/dish-meal-food-produce-recipe-fish-breakfast-meat-pork-cuisine-steak-pork-chop-power-dishes-grilling-fried-food-604134.jpg',
    //     [
    //         new Ingredient('Buns' , 10),
    //         new Ingredient('Cheese' ,2)
    //     ])
    //   ];  
    constructor(private slService : ShoppingListService){}

    getRecipes() {
        if(this.recipes)
        return this.recipes.slice();
    }

    AddIngredientsToShoppingList(ingredients : Ingredient[]){
        this.slService.addIngredients(ingredients);
    }

    getRecipe(id:number){
        return this.recipes[id];
    }

    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number,newrecipe:Recipe){
        this.recipes[index]=newrecipe;
        this.recipesChanged.next(this.recipes.slice());

    }

    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }

    setRecipes(recipes : Recipe[]){
        this.recipes=recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
}