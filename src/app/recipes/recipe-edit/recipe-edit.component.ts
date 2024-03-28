import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
		private _recipeService: RecipeService,
		private _router: Router,
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
		}

		this.recipeForm = new FormGroup({
			name: new FormControl(recipe?.name || null, Validators.required),
			imagePath: new FormControl(
				recipe?.imagePath || null,
				Validators.required
			),
			description: new FormControl(
				recipe?.description || null,
				Validators.required
			),
			ingredients: new FormArray(
				recipe?.ingredients
					? this.initFormIngredients(recipe.ingredients)
					: []
			),
		});
	}

	private initFormIngredients(ingredients: Ingredient[]): FormGroup[] {
		return ingredients.map((ingredient) => {
			return new FormGroup({
				name: new FormControl(ingredient.name, Validators.required),
				amount: new FormControl(ingredient.amount, [
					Validators.required,
					Validators.min(1),
				]),
			});
		});
	}

	onAddIngredient() {
		(<FormArray>this.recipeForm.get('ingredients')).push(
			new FormGroup({
				name: new FormControl(null, [Validators.required]),
				amount: new FormControl(null, [
					Validators.required,
					Validators.min(1),
				]),
			})
		);
	}

	onSubmit() {
		if (this.editMode) {
			this._recipeService.updateRecipe(this.id, this.recipeForm.value);
		} else {
			this._recipeService.addRecipe(this.recipeForm.value);
		}
		this.onCancel();
	}

	onCancel() {
		this._router.navigate(['../'], { relativeTo: this._activatedRoute });
	}

	onDeleteIngredient(index: number) {
		const formArray = this.recipeForm.get('ingredients') as FormArray;
		formArray.removeAt(index);
	}

	get ingredientControls() {
		return (<FormArray>this.recipeForm?.get('ingredients'))?.controls;
	}
}
