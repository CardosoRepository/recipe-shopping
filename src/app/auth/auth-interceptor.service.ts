import { Injectable } from '@angular/core';
import {
	HttpInterceptor,
	HttpEvent,
	HttpHandler,
	HttpRequest,
	HttpParams,
} from '@angular/common/http';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
	constructor(private _authService: AuthService) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return this._authService.user.pipe(
			take(1),
			exhaustMap((user) => {
				if (!user) {
					return next.handle(req);
				}
				const modifiedRequest = req.clone({
					params: new HttpParams().set('auth', user.token),
				});
				return next.handle(modifiedRequest);
			})
		);
	}
}
