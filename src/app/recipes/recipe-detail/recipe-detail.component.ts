import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})
export class RecipeDetailComponent {
	@Input() recipe: Recipe;

	constructor(private _recipeService: RecipeService) {}

	onAddToShoppingList() {
		this._recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
	}
}
