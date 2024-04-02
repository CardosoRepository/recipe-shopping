import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
	constructor(
		private _httpClient: HttpClient,
		private _recipeService: RecipeService,
		private _authService: AuthService
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
		return this._authService.user.pipe(
			take(1),
			exhaustMap((user) => {
				return this._httpClient.get<Recipe[]>(
					'https://ng-complete-guide-437a4-default-rtdb.firebaseio.com/recipes.json',
					{
						params: new HttpParams().set('auth', user.token),
					}
				);
			}),
			map((recipes) => {
				if (!recipes) {
					return [];
				}

				return recipes.map((recipe) => {
					return {
						...recipe,
						ingredients: recipe?.ingredients
							? recipe.ingredients
							: [],
					};
				});
			}),
			tap((recipes) => {
				this._recipeService.setRecipes(recipes);
			})
		);
	}
}
