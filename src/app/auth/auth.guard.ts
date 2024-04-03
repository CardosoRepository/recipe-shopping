import {
	ActivatedRouteSnapshot,
	CanActivateFn,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { Observable, map, take, tap } from 'rxjs';

export const AuthGuardFn: CanActivateFn = (
	route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot
):
	| boolean
	| UrlTree
	| Promise<boolean | UrlTree>
	| Observable<boolean | UrlTree> => {
	const authService = inject(AuthService);
	const router = inject(Router);

	return authService.user.pipe(
		take(1),
		map((user) => {
			const isAuth = !!user;

			if (isAuth) {
				return true;
			}
			return router.createUrlTree(['/auth']);
		})
	);
};

// THIS IS DEPRECATED
// @Injectable()
// export class AuthGuard implements CanActivate {
// 	constructor(private _authService: AuthService, private _router: Router) {}

// 	canActivate(
// 		route: ActivatedRouteSnapshot,
// 		state: RouterStateSnapshot
// 	): boolean | Promise<boolean> | Observable<boolean> {
// 		return this._authService.user.pipe(
// 			take(1),
// 			map((user) => {
// 				return !!user;
// 			}),
// 			tap((isAuth) => {
// 				if (!isAuth) {
// 					this._router.navigate(['/auth']);
// 				}
// 			})
// 		);
// 	}
// }
