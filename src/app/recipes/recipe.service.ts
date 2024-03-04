import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
	recipeSelected = new EventEmitter<Recipe>();

	private recipes: Recipe[] = [
		new Recipe(
			'A Test Recipe',
			'This is simply a test',
			'https://lobsterfrommaine.com/wp-content/uploads/fly-images/1577/20210517-Pasta-alla-Gricia-with-Lobster3010-1024x576-c.jpg',
			[
				new Ingredient('Meat', 1),
				new Ingredient('French Fries', 20),
			]
		),
		new Recipe(
			'Second Recipe',
			'Second test',
			'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
			[
				new Ingredient('Buns', 2),
				new Ingredient('Meat', 1),
			]
		),
	];

	constructor(private _shoppingListService: ShoppingListService) {}

	getRecipe(index: number) {
		return this.recipes[index];
	}

	getRecipes() {
		return this.recipes.slice();
	}

	addIngredientsToShoppingList(ingredients: Ingredient[]) {
		this._shoppingListService.addIngredients(ingredients);
	}
}
