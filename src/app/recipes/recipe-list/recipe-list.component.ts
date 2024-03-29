import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent implements OnInit, OnDestroy {
	recipes: Recipe[];
	subscription: Subscription;

	constructor(private _recipeService: RecipeService,
				private _dataStorageService: DataStorageService) {}

	ngOnInit(): void {
		this._dataStorageService.fetchRecipes();
		this.recipes = this._recipeService.getRecipes();
		this.subscription = this._recipeService.recipesChanged?.subscribe((recipes: Recipe[]) => {
			this.recipes = recipes;
		})
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
