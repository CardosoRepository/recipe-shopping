import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.component';
import { RecipesStartComponent } from './recipes/recipes-start/recipes-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeService } from './recipes/recipe.service';
import { DataStorageService } from './shared/data-storage.service';
import { HttpClientModule } from '@angular/common/http';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';

@NgModule({
	declarations: [
		// Components
		AppComponent,
		HeaderComponent,
		RecipesComponent,
		RecipeListComponent,
		RecipeDetailComponent,
		RecipeItemComponent,
		ShoppingListComponent,
		ShoppingEditComponent,
		RecipesStartComponent,
		RecipeEditComponent,
		AuthComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		ReactiveFormsModule,
		HttpClientModule
	],
	providers: [ShoppingListService, RecipeService, DataStorageService, RecipesResolverService],
	bootstrap: [AppComponent],
})
export class AppModule {}
