import { useState, ChangeEvent } from "react";
import "./newpost.css";
import { ReceiptIcon } from "lucide-react";
import { useAuth } from "../auth/AuthUserProvider";

const NewPostPage = () => {
  const [strMeal, setMealName] = useState("");
  const [strCategory, setMealType] = useState("");
  const [recipeTime, setMealTime] = useState("");
  const [postQuantities, setQuantities] = useState("");
  const [strInstructions, setSteps] = useState("");
  const { user } = useAuth();
  let idCount = 0;

  const createPost = async () => {
    if (user?.displayName) {
      const encodedId = encodeURIComponent(user.displayName);
      try {
        idCount++;
        const response = await fetch(
          `http://localhost:8080/api/recipe/take2/${idCount}`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              ownerId: encodedId,
              idMeal: idCount,
              strMeal: strMeal,
              strMealThumb: "none",
              strSource: "none",
              strCategory: strCategory,
              quantities: "none",
              postQuantities: postQuantities,
              strInstructions: strInstructions,
            }),
          }
        );

        const result = await response.json();
        console.log(result);
        if (result.success) {
          console.log("Recipe Created Sucessfully");
        } else {
          console.log("Recipe Creation Failed");
        }
      } catch (error) {
        console.log("Error Creating Recipe");
      }
    }
  };

  return (
    <div className="container">
      <h1>Create A Recipe!</h1>
      <div className="input-container">
        <div className="meal-name">
          <input
            type="text"
            placeholder="Input Recipe Name"
            value={strMeal}
            onChange={(e) => setMealName(e.target.value)}
          />
        </div>

        <div className="meal-type">
          <input
            type="text"
            placeholder="Input Recipe Type"
            value={strCategory}
            onChange={(e) => setMealType(e.target.value)}
          />
        </div>

        <div className="quantities">
          <textarea
            placeholder="Input Ingredients + Measurements"
            value={postQuantities}
            onChange={(e) => setQuantities(e.target.value)}
          />
        </div>

        <div className="steps">
          <textarea
            placeholder="Input Directions (One step per line)"
            value={strInstructions}
            onChange={(e) => setSteps(e.target.value)}
          />
        </div>
      </div>
      <button onClick={createPost}>Create Post</button>
    </div>
  );
};

export default NewPostPage;
