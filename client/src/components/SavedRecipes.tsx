import * as React from "react";
import { useState, useEffect } from "react";
import { SingleRecipeType } from "../constants/types";
import SavedRecipeDisplay from "./SavedRecipeDisplay";

interface SavedRecipesProps {
  savedRecipes: string[];
}

const SavedRecipes: React.FC<SavedRecipesProps> = ({ savedRecipes }) => {
  const [recipeDetails, setRecipeDetails] = useState<SingleRecipeType[]>([]);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const detailsPromises = savedRecipes.map(async (recipeId) => {
        const response = await fetch(
          `http://localhost:8080/api/recipe/${recipeId}`
        );
        if (response.ok) {
          const data = await response.json();
          return data.data;
        } else {
          console.error(`Failed to fetch details for recipe ${recipeId}`);
          return null;
        }
      });

      const details = await Promise.all(detailsPromises);
      setRecipeDetails(details.filter((detail) => detail !== null));
    };

    fetchRecipeDetails();
  }, [savedRecipes]);

  return (
    <div>
      <h2>Saved Recipes</h2>
      {recipeDetails.length === 0 ? (
        <p>No saved recipes yet.</p>
      ) : (
        <ul>
          {recipeDetails.map((recipe, index) => (
            <li key={index}>
              <SavedRecipeDisplay recipe={recipe} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedRecipes;
