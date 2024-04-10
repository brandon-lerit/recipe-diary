export type SingleRecipeType = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strSource: string;
  strCategory: string;
  //recipeTime: string; not in api
  quantities: Map<string, string>;
  strInstructions: string;
  ownerId?: string;
};
