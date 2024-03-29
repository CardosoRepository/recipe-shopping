import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";

@Injectable()
export class DataStorageService {
	constructor(private _httpClient: HttpClient,
				private _recipeService: RecipeService) {}

	storeRecipes() {
		const recipes = this._recipeService.getRecipes();

		this._httpClient.put('https://ng-complete-guide-437a4-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(response => {
			console.log(response);
		});
	}
}
