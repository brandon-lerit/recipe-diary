import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthUserProvider";
import SingleRecipe from "../components/SingleRecipe";
import { SingleRecipeType } from "../constants/types";
import "./profile.css";

const ProfilePage = () => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState<SingleRecipeType[]>([]);

  //VALERIES ORIGINAL CODE
  // const fetchRecipes = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:8080/api/recipe/owner/${1}`);
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("Fetching recipe: ", data);
  //       setRecipes(data);
  //     } else {
  //       console.error("Failed to fetch recipes");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchRecipes();
  // }, []);

  //Untested added code
  const fetchRecipes = async (userId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/recipe/owner/${userId}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Fetching recipe: ", data);
        setRecipes(data);
      } else {
        console.error("Failed to fetch recipes");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // if (user) {
    //   fetchRecipes(user.uid);
    // }
    if (user?.displayName) {
      // const encodedId = encodeURIComponent(user.displayName);
      fetchRecipes(user.displayName);
    }
  }, [user]);

  const numberOfPosts = recipes.length;

  return (
    <div>
      <h1>Your Recipe Posts</h1>
      <p>Posts: {numberOfPosts}</p>

      <div className="profile_posts">
        {
          // const = s___ = mapping, then console log then call it here
          recipes.map((recipe) => (
            <SingleRecipe key={recipe.idMeal} recipe={recipe} userId={user?.uid} />
          ))
        }
      </div>
    </div>
  );
};

export default ProfilePage;
