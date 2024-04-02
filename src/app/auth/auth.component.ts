import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
})
export class AuthComponent {
	isLoginMode = true;
	isLoading = false;
	error: string = null;

	constructor(private _authService: AuthService,
				private _router: Router) {}

	onSwitchMode() {
		this.isLoginMode = !this.isLoginMode;
	}

	onSubmit(form: NgForm) {
		if (!form.valid) {
			return;
		}

		const email = form.value.email;
		const password = form.value.password;
		let authObservable: Observable<AuthResponseData>;

		this.isLoading = true;

		authObservable = this.isLoginMode
			? this._authService.login(email, password)
			: this._authService.signUp(email, password);

		authObservable.subscribe({
			next: (responseData) => {
				this.isLoading = false;
				this._router.navigate(['/recipes']);
			},
			error: (errorMsg) => {
				this.error = errorMsg;
				this.isLoading = false;
			},
			complete: () => {},
		});
		form.reset();
	}
}
