export type SingleRecipeType = {
  ownerId?: string; //opional
  //isPost: boolean;
  idMeal: string;
  strMeal: string;
  strMealThumb?: string;
  strSource?: string;
  strCategory?: string;
  //recipeTime: string; not in api
  quantities?: Map<string, string>;
  postQuantities?: string; // string someone enters on post
  strInstructions: string;
  children?: React.ReactNode;
};

export type User = {
  id: string;
  name: string;
  savedRecipes: string[];
};
