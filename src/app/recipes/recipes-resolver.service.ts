import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	Resolve,
	RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { Observable } from 'rxjs';
import { RecipeService } from './recipe.service';

@Injectable()
export class RecipesResolverService implements Resolve<Recipe[]> {
	constructor(
		private _dataStorageService: DataStorageService,
		private _recipeService: RecipeService
	) {}

	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
		const recipes = this._recipeService.getRecipes();

		return recipes.length === 0
			? this._dataStorageService.fetchRecipes()
			: recipes;
	}
}
