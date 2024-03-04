import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.scss'
})
export class RecipeEditComponent implements OnInit {
	id: number;
	editMode: boolean = false;

	constructor(private _activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {
		this._activatedRoute.params.subscribe((params: Params) => {
			this.id = +params['id'];
			this.editMode = params['id'] !== undefined;
		})
	}
}
