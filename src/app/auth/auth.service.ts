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

	constructor(private _http: HttpClient,
				private _router: Router) {}

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

	logout() {
		this.user.next(null);
		this._router.navigate(['/auth']);
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
