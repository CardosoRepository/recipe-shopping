import { Component } from '@angular/core';
import { RecipeService } from './recipe.service';

@Component({
	selector: 'app-recipes',
	templateUrl: './recipes.component.html',
	styleUrl: './recipes.component.scss',
	providers: [RecipeService],
})
export class RecipesComponent {

	constructor() {
	}
}
