import { SingleRecipeType } from "../../../common/types";
import { getUser } from "../../../server/user.controller";
import { useAuth } from "../auth/AuthUserProvider";

type Props = {
  recipe: SingleRecipeType;
  userId?: string;
};

const SingleRecipe = (props: Props) => {
  const recipe = props.recipe;

  //const userID = await getUser(id);
  //const userId = "1"; //need to encode a way to keep track of curr user logged in
  const { user } = useAuth();

  const handleSave = async () => {
    console.log(recipe);
    if (user?.displayName) {
      const encodedId = encodeURIComponent(user.displayName);
      console.log(encodedId);
      //get user (curr user for system) with route
      const userResponse = await fetch(
        `http://localhost:8080/api/user/${encodedId}`
      );

      if (userResponse.ok) {
        const userData = await userResponse.json();
        //const user = userData.data;

        const recipeId = recipe.idMeal;
        const recipeResponse = await fetch(
          `http://localhost:8080/api/recipe/${recipeId}`
        );
        //if response ok continue, otherwise use post api to add to db
        if (!recipeResponse.ok) {
          const addRecipeToDB = await fetch(
            `http://localhost:8080/api/recipe/take2/${recipeId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ownerId: 100000,
                idMeal: recipe.idMeal,
                strMeal: recipe.strMeal,
                strMealThumb: recipe.strMealThumb,
                strSource: recipe.strSource,
                strCategory: recipe.strCategory,
                quantities: recipe.quantities,
                postQuantities: "holder",
                strInstructions: recipe.strInstructions,
              }),
            }
          ); //check
          //flyctl deploy
          console.log(addRecipeToDB);
        }
        const recipeResponse2 = await fetch(
          `http://localhost:8080/api/user/${encodedId}/save/${recipeId}`,
          { method: "PUT" }
        );
        const userResponse2 = await fetch(
          `http://localhost:8080/api/user/${encodedId}`
        );
        const userData2 = await userResponse2.json();
        const user = userData2.data;
        console.log(user.savedRecipes);
        return user.savedRecipes;
      } else {
        return null; //user not in system
      }
    }
    //use to add saved recipe route to add to saved recipes list
  };

  const handleDelete = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/recipe", {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({}),
      });

      const result = await response.json();
      if (result.success) {
        console.log("Recipe Deleted Sucessfully");
      } else {
        console.log("Recipe Deltion Failed");
      }
    } catch (error) {
      console.log("Error Deletion Recipe");
    }
  };
  if (user?.displayName) {
    const encodedId = encodeURIComponent(user.displayName);
    return (
      <div className="single-recipe">
        <h3>{recipe.strMeal}</h3>
        {recipe.ownerId !== encodedId && <p>{recipe.strCategory}</p>}
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="recipe-image"
        />
        {recipe.ownerId !== encodedId && (
          <p>
            Link:{" "}
            <a
              href={recipe.strSource}
              target="_blank"
              rel="noopener noreferrer"
            >
              {recipe.strSource}
            </a>
          </p>
        )}
        <button onClick={handleSave}>Save Recipe</button>
        {recipe.ownerId === encodedId && (
          <button onClick={handleDelete}>Delete Recipe</button>
        )}
      </div>
    );
  }
};
//note also want feature to save / add to collection
//add more fields in here such as ingrediants?

export default SingleRecipe;
