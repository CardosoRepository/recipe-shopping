import { Component } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
	selector: 'app-recipes',
	templateUrl: './recipes.component.html',
	styleUrl: './recipes.component.scss',
	providers: [RecipeService],
})
export class RecipesComponent {
	selectedRecipe: Recipe;

	constructor(private _recipeService: RecipeService) {
		this._recipeService.recipeSelected.subscribe((recipe: Recipe) => {
			this.selectedRecipe = recipe;
		});
	}
}
