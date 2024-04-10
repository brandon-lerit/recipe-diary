import { useState } from "react";
import SingleRecipe from "../components/SingleRecipe";
import { SingleRecipeType } from "../constants/types";
import Search from "../components/Search";
import "./explore.css";

const Explore = () => {
  const [recipes, setRecipes] = useState<SingleRecipeType[]>([]);

  const combineIngredientsAndQuantities = (meal: any): Map<string, string> => {
    const quantities: Map<string, string> = new Map();

    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const quantity = meal[`strMeasure${i}`];

      // no more ingredients
      if (!ingredient) {
        break;
      }
      quantities.set(ingredient, quantity);
    }

    return quantities;
  };

  // const findRecipe = (query: string) => {
  //   fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
  //     .then((res) => res.json())
  //     .then((d) => setRecipes(d.meals || []))
  //     .catch((err) => console.log(err));
  // };
  const findRecipe = (query: string) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then((res) => res.json())
      .then((data) => {
        const meals = data.meals || [];

        // Format the quantities field for each recipe
        const formattedRecipes = meals.map((meal: any) => ({
          ...meal,
          quantities: combineIngredientsAndQuantities(meal),
        }));

        setRecipes(formattedRecipes);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="app-container">
      <div className="explore-page">
        <h1>Search For Recipes</h1>
        <Search searchRes={findRecipe} />
        <div className="recipe-list">
          {recipes.map((recipe) => (
            <SingleRecipe key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
