import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
	constructor(
		private _httpClient: HttpClient,
		private _recipeService: RecipeService
	) {}

	storeRecipes() {
		const recipes = this._recipeService.getRecipes();

		this._httpClient
			.put(
				'https://ng-complete-guide-437a4-default-rtdb.firebaseio.com/recipes.json',
				recipes
			)
			.subscribe();
	}

	fetchRecipes() {
		this._httpClient
			.get<Recipe[]>(
				'https://ng-complete-guide-437a4-default-rtdb.firebaseio.com/recipes.json'
			)
			.subscribe((recipes) => {
				this._recipeService.setRecipes(recipes);
			});
	}
}
