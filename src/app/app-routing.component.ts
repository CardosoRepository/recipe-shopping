import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthComponent } from './auth/auth.component';

export const appRoutes: Routes = [
	{ path: 'shopping-list', component: ShoppingListComponent },
	{ path: 'auth', component: AuthComponent },
	{ path: '', redirectTo: 'recipes', pathMatch: 'full' },
];
@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
