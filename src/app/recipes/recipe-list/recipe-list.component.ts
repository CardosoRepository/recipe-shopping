import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent implements OnInit, OnDestroy {
	recipes: Recipe[];
	subscription: Subscription;

	constructor(private _recipeService: RecipeService) {}

	ngOnInit(): void {
		this.recipes = this._recipeService.getRecipes();
		this.subscription = this._recipeService.recipesChanged?.subscribe((recipes: Recipe[]) => {
			this.recipes = recipes;
		})
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
