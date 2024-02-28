import { Recipe } from "./recipe.model";

export class RecipeService {
	private recipes: Recipe[] = [
		new Recipe('A Test Recipe', 'This is simply a test', 'https://lobsterfrommaine.com/wp-content/uploads/fly-images/1577/20210517-Pasta-alla-Gricia-with-Lobster3010-1024x576-c.jpg'),
		new Recipe('Second Recipe', 'Second test', 'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg')
	];

	getRecipes() {
		return this.recipes.slice();
	}
}
