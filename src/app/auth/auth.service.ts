import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

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
	constructor(private _http: HttpClient) {}

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
			.pipe(catchError(this.handleError));
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
			.pipe(catchError(this.handleError));
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
		}

		return throwError(() => errorMsg);
	}
}
