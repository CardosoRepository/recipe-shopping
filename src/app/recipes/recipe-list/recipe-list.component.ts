import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent {
	@Output() recipeWasSelected = new EventEmitter<Recipe>();

	recipes: Recipe[] = [
		new Recipe('A Test Recipe', 'This is simply a test', 'https://lobsterfrommaine.com/wp-content/uploads/fly-images/1577/20210517-Pasta-alla-Gricia-with-Lobster3010-1024x576-c.jpg'),
		new Recipe('Second Recipe', 'Second test', 'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg')
	];

	onRecipeSelected(recipe: Recipe) {
		this.recipeWasSelected.emit(recipe);
	}
}
