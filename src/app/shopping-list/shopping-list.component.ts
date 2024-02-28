import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss'
})
export class ShoppingListComponent implements OnInit {
	ingredients: Ingredient[] = [];

	constructor(private _shoppingListService: ShoppingListService) {}

	ngOnInit(): void {
		this.ingredients = this._shoppingListService.getIngredients();
		this._shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
			this.ingredients = ingredients;
		})
	}
}
