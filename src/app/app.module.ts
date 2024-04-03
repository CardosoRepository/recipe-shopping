import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.component';
import { RecipeService } from './recipes/recipe.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

@NgModule({
	declarations: [AppComponent, HeaderComponent],
	imports: [
		CoreModule,
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		SharedModule,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
