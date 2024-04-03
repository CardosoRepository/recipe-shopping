import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AuthGuardFn } from '../auth/auth.guard';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipes-resolver.service';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesStartComponent } from './recipes-start/recipes-start.component';

const routes: Routes = [
	{
		path: '',
		component: RecipesComponent,
		canActivate: [AuthGuardFn],
		children: [
			{
				path: ':id/edit',
				component: RecipeEditComponent,
				resolve: [RecipesResolverService],
			},
			{ path: 'new', component: RecipeEditComponent },
			{
				path: ':id',
				component: RecipeDetailComponent,
				resolve: [RecipesResolverService],
			},
            { path: '', component: RecipesStartComponent },
		],
	},
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RecipesRoutingModule {}
