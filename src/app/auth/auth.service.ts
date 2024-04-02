import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
	idToken: string;
	email: string;
	refreshToken: string;
	expiresIn: string;
	displayName: string;
	localId: string;
	registered?: boolean;
}

@Injectable()
export class AuthService {
	user = new BehaviorSubject<User>(null);

	private _tokenExpirationTimer: any;

	constructor(private _http: HttpClient, private _router: Router) {}

	signUp(email: string, password: string) {
		return this._http
			.post<AuthResponseData>(
				'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCP79vHyhPGAR8FYTL5YcO1x75OmqqID5M',
				{
					email: email,
					password: password,
					returnSecureToken: true,
				}
			)
			.pipe(
				catchError(this.handleError),
				tap((responseData) => {
					this.handleAuthentication(
						responseData.email,
						responseData.localId,
						responseData.idToken,
						+responseData.expiresIn
					);
				})
			);
	}

	login(email: string, password: string) {
		return this._http
			.post<AuthResponseData>(
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCP79vHyhPGAR8FYTL5YcO1x75OmqqID5M',
				{
					email: email,
					password: password,
					returnSecureToken: true,
				}
			)
			.pipe(
				catchError(this.handleError),
				tap((responseData) => {
					this.handleAuthentication(
						responseData.email,
						responseData.localId,
						responseData.idToken,
						+responseData.expiresIn
					);
				})
			);
	}

	autoLogin() {
		const userData: {
			email: string;
			id: string;
			_token: string;
			_tokenExpirationDate: string;
		} = JSON.parse(localStorage.getItem('userData'));

		if (!userData) {
			return;
		}

		const loadedUser = new User(
			userData.email,
			userData.id,
			userData._token,
			new Date(userData._tokenExpirationDate)
		);

		if (loadedUser.token) {
			this.user.next(loadedUser);

			const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
			this.autoLogout(expirationDuration);
		}
	}

	logout() {
		this.user.next(null);
		this._router.navigate(['/auth']);
		localStorage.removeItem('userData');

		if (this._tokenExpirationTimer) {
			clearTimeout(this._tokenExpirationTimer);
		}
		this._tokenExpirationTimer = null;
	}

	autoLogout(expirationDate: number) {
		this._tokenExpirationTimer = setTimeout(() => {
			this.logout();
		}, expirationDate);
	}

	private handleAuthentication(
		email: string,
		userId: string,
		token: string,
		expiresIn: number
	) {
		const expirationDate = new Date(
			new Date().getTime() + expiresIn * 1000
		);
		const user = new User(email, userId, token, expirationDate);

		this.user.next(user);
		this.autoLogout(expiresIn * 1000);
		localStorage.setItem('userData', JSON.stringify(user));
	}

	private handleError(errorRes: HttpErrorResponse) {
		let errorMsg = 'An error occurred!';

		if (!errorRes?.error || !errorRes?.error?.error) {
			return throwError(() => errorMsg);
		}

		switch (errorRes.error.error.message) {
			case 'EMAIL_EXISTS':
				errorMsg = 'This email exists already.';
				break;
			case 'INVALID_LOGIN_CREDENTIALS':
				errorMsg = 'User or password incorrect.';
				break;
			case 'EMAIL_NOT_FOUND':
				errorMsg = 'This email does not exist.';
				break;
			case 'INVALID_PASSWORD':
				errorMsg = 'This password is not correct.';
				break;
		}

		return throwError(() => errorMsg);
	}
}
