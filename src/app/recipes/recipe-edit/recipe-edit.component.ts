import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
	selector: 'app-recipe-edit',
	templateUrl: './recipe-edit.component.html',
	styleUrl: './recipe-edit.component.scss',
})
export class RecipeEditComponent implements OnInit {
	id: number;
	editMode: boolean = false;
	recipeForm: FormGroup;

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _recipeService: RecipeService
	) {}

	ngOnInit(): void {
		this._activatedRoute.params.subscribe((params: Params) => {
			this.id = +params['id'];
			this.editMode = params['id'] !== undefined;
			this.initForm();
		});
	}

	private initForm() {
		let recipe: Recipe;

		if (this.editMode) {
			recipe = this._recipeService.getRecipe(this.id);
		};

		this.recipeForm = new FormGroup({
			name: new FormControl(recipe?.name || null),
			imagePath: new FormControl(recipe?.imagePath || null),
			description: new FormControl(recipe?.description || null),
			ingredients: new FormArray(recipe?.ingredients ? this.createIngredient(recipe.ingredients) : null),
		});
	}

	createIngredient(ingredients: Ingredient[]): FormGroup[] {
		return ingredients.map(ingredient => {
			return new FormGroup({
				amount: new FormControl(ingredient.amount),
				name: new FormControl(ingredient.name)
			})
		})
	}

	onSubmit() {
		console.log(this.recipeForm);
	}

	get ingredientControls() {
		return (<FormArray>this.recipeForm.get('ingredients')).controls;
	}
}
