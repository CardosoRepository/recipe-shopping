import { NgModule } from "@angular/core";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { FormsModule } from "@angular/forms";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
	declarations: [
		ShoppingListComponent,
		ShoppingEditComponent,
	],
	imports: [
		FormsModule,
		SharedModule,
		ShoppingListRoutingModule
	]
})
export class ShoppingListModule {}
