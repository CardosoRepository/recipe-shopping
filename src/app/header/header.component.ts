import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styles: ['.active {background-color: rgba(0, 0, 0, 0.05); font-weight: 500; padding: 0.5rem}'],
})
export class HeaderComponent {

	constructor(private _dataStorageService: DataStorageService) {}

	onSaveData() {
		this._dataStorageService.storeRecipes();
	}

	onLoadData() {
		this._dataStorageService.fetchRecipes();
	}
}
