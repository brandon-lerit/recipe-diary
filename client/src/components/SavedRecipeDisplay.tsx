import * as React from "react";
import { SingleRecipeType } from "../constants/types";

interface SavedRecipesDisplayProps {
  recipe: SingleRecipeType;
}

const SavedRecipeDisplay: React.FC<SavedRecipesDisplayProps> = ({ recipe }) => {
  return (
    <div className="saved-recipe-display">
      <h3>{recipe.strMeal}</h3>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="recipe-image"
        style={{ maxWidth: "150px", maxHeight: "150px" }}
      />
      <p>
        Link:{" "}
        <a href={recipe.strSource} target="_blank" rel="noopener noreferrer">
          {recipe.strSource}
        </a>
      </p>
    </div>
  );
};

export default SavedRecipeDisplay;
