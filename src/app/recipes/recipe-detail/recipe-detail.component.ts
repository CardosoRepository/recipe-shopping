import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})
export class RecipeDetailComponent implements OnInit {
	recipe: Recipe;
	id: number;

	constructor(private _recipeService: RecipeService,
				private _activatedRoute: ActivatedRoute,
				private _router: Router) {}

	ngOnInit(): void {
		this._activatedRoute.params.subscribe((params: Params) => {
			this.id = +params['id'];
			this.recipe = this._recipeService.getRecipe(this.id);
		})
	}

	onAddToShoppingList() {
		this._recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
	}

	onEditRecipe() {
		this._router.navigate(['edit'], {relativeTo: this._activatedRoute});
		// this._router.navigate(['../', this.id, 'edit'], {relativeTo: this._activatedRoute});
	}

	onDeleteRecipe(index: number) {
		this._recipeService.deleteRecipe(index);
		this._router.navigate(['../'], {relativeTo: this._activatedRoute});
	}
}
