import { SingleRecipeType, User } from "../common/types";
import { db } from "./firebase";

const userCollectionRef = db.collection("users");
const recipeCollectionRef = db.collection("recipes");
//need to add corresponding routes in server.ts

export const getUser = async (id: string) => {
  const doc = await userCollectionRef.doc(id).get();
  if (doc.exists) {
    return doc.data();
  } else {
    return null;
  }
};

export const deleteUser = async (id: string) => {
  return await userCollectionRef.doc(id).delete();
};

//create user
export const createUser = async (id: string, user: User) => {
  const newDoc = userCollectionRef.doc(id);
  return await newDoc.set(user);
};

//get all saved recipes
export const getSavedRecipes = async (id: string) => {
  const doc = await userCollectionRef.doc(id).get(); //document id
  if (doc.exists) {
    const user = doc.data() as User;
    return user.savedRecipes;
  } else {
    return [];
  }
};

//add recipe to saved recipes
export const addSaveRecipe = async (id: string, recipeId: string) => {
  const doc = await userCollectionRef.doc(id).get();
  if (doc.exists) {
    const user = doc.data() as User;
    const recipeArray = user.savedRecipes;
    if (!recipeArray.includes(recipeId)){
      recipeArray.push(recipeId);
    }
    

    await userCollectionRef.doc(id).update({
      savedRecipes: recipeArray,
    });
    return recipeId; //successful update
  } else {
    return null;
  }
};

// remove a saved recipe
export const deleteSaveRecipe = async (id: string, recipeId: string) => {
  const doc = await userCollectionRef.doc(id).get();
  if (doc.exists) {
    const user = doc.data() as User;
    const index = user.savedRecipes.indexOf(recipeId);
    if (index > -1) {
      const updatedRecipes = user.savedRecipes.splice(index, 1);
      await userCollectionRef.doc(id).update({
        savedRecipes: updatedRecipes,
      });
      return recipeId; //successful update
    } else {
      return null;
    }
  } else {
    return null;
  }
};
