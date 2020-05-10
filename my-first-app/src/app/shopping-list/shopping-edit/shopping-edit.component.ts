import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editMode = false;
  editedItemIndex : number;
  editedItem : Ingredient;
  subscription : Subscription;
  @ViewChild('f') slForm : NgForm;

  constructor(private slService : ShoppingListService) { }

  ngOnInit(): void {
    this.subscription=this.slService.startedEditing.subscribe(
      (index : number) => {
        this.editMode=true;
        this.editedItemIndex=index;
        this.editedItem=this.slService.getIngredient(index);
        this.slForm.setValue({name:this.editedItem.name,amount:this.editedItem.amount})
      }
    );
  }

  onAddItem(form : NgForm){
    const newIngredient = new Ingredient(form.value.name,form.value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex,newIngredient);
    }
    else{
      this.slService.addIngredient(newIngredient);
    }
    this.slForm.form.reset();
    this.editMode=false;
  }

  onClear(){
    this.slForm.form.reset();
    this.editMode=false;
  }

  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
