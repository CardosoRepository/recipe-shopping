import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styles: [
		'.active {background-color: rgba(0, 0, 0, 0.05); font-weight: 500; padding: 0.5rem}',
	],
})
export class HeaderComponent implements OnInit, OnDestroy {
	isAuthenticated = false;

	private _userSub: Subscription;

	constructor(
		private _dataStorageService: DataStorageService,
		private _authService: AuthService
	) {}

	ngOnInit(): void {
		this._userSub = this._authService.user.subscribe(user => {
			this.isAuthenticated = !!user;
		});
	}

	ngOnDestroy(): void {
		this._userSub.unsubscribe();
	}

	onSaveData() {
		this._dataStorageService.storeRecipes();
	}

	onLoadData() {
		this._dataStorageService.fetchRecipes().subscribe();
	}
}
