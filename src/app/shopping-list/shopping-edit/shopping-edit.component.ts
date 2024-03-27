import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-shopping-edit',
	templateUrl: './shopping-edit.component.html',
	styleUrl: './shopping-edit.component.scss',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
	@ViewChild('f', { static: false }) shoppingListForm: NgForm;

	editingSubscription: Subscription;
	editMode = false;
	editedItemIndex: number;
	editedItem: Ingredient;

	constructor(private _shoppingListService: ShoppingListService) {}

	ngOnInit(): void {
		this.editingSubscription =
			this._shoppingListService.startedEditing.subscribe(
				(index: number) => {
					this.editMode = true;
					this.editedItemIndex = index;
					this.editedItem =
						this._shoppingListService.getIngredient(index);

					this.shoppingListForm.setValue({
						name: this.editedItem.name,
						amount: this.editedItem.amount,
					});
				}
			);
	}

	ngOnDestroy(): void {
		this.editingSubscription.unsubscribe();
	}

	onSubmit(form: NgForm) {
		const formValue = form.value;
		const newIngredient = new Ingredient(formValue.name, formValue.amount);

		if (this.editMode) {
			this._shoppingListService.updateIngredient(
				this.editedItemIndex,
				newIngredient
			);
		} else {
			this._shoppingListService.addIngredient(newIngredient);
		}
		form.reset();
		this.editMode = false;
	}
}
