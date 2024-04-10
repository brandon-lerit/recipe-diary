//modifies recipe collection in Firestore
import { SingleRecipeType } from "../common/types";
import { db } from "./firebase";
//import { v4 as uuidv4 } from "uuid";

export const recipeCollectionRef = db.collection("recipes");

let recipes: SingleRecipeType[] = [];

// export const addRecipe = (
//   ownerId: string,
//   recipeName: string,
//   recipeType: string,
//   quantities: Map<string, string>,
//   steps: string
// ): SingleRecipeType => {
//   //const idMeal = uuidv4();

//   const newRecipe: SingleRecipeType = {
//     ownerId,
//     idMeal,
//     strMeal: recipeName,
//     strMealThumb: "", // Placeholder, replace with actual image URL
//     strSource: "", // Placeholder, replace with actual source
//     strCategory: recipeType,
//     quantities,
//     strInstructions: steps,
//   };

//   recipes.push(newRecipe);
//   return newRecipe;
// };

export const addRecipe2 = async (id: string, recipe: SingleRecipeType) => {
  //trying another way
  const newDoc = recipeCollectionRef.doc(id);
  return await newDoc.set(recipe);
};

export const getRecipe = async (id: string) => {
  const doc = await recipeCollectionRef.doc(id).get();
  if (doc.exists) {
    return doc.data();
  } else {
    return null;
  }
};

export const getRecipeOwner = async (ownerId: string) => {
  const snapshot = await recipeCollectionRef
    .where("ownerId", "==", ownerId)
    .get();
  let recipes: Record<string, SingleRecipeType> = {};
  snapshot.forEach((doc) => {
    recipes[doc.id] = doc.data() as SingleRecipeType;
  });
  return recipes;
};

export const deleteRecipe = async (idMeal: string) => {
  return await recipeCollectionRef.doc(idMeal).delete();
};
