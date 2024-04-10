import path from "path";
import express, { Express } from "express";
import cors from "cors";
import {
  //addRecipe,
  deleteRecipe,
  getRecipe,
  recipeCollectionRef,
  addRecipe2,
  getRecipeOwner,
} from "./recipe.controller";
import { SingleRecipeType, User } from "../common/types";
import {
  getUser,
  createUser,
  getSavedRecipes,
  addSaveRecipe,
  deleteSaveRecipe,
  deleteUser,
} from "./user.controller";
import admin from "firebase-admin";
import { Request, Response, NextFunction } from "express";

const app: Express = express();
const port = 8080;
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

interface AuthenticatedRequest extends Request {
  user?: User;
}

//Used to protect user routes, unsure if works properly

// const authenticateUser = async (
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   const idToken = req.header("Authorization");

//   if (idToken === undefined) {
//     throw new Error("Authorization token not provided");
//   }

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(idToken);

//     req.user = {
//       ...decodedToken,
//       id: decodedToken.uid,
//       name: "",
//       savedRecipes: [],
//     };
//     next();
//   } catch (error) {
//     res.status(401).json({ error: "Unauthorized" });
//   }
// };
// app.use("/api/user/:id", authenticateUser);
// app.use("/api/user/:id/save/:recipeId", authenticateUser);
// app.use("/api/user/:id/removeSave/:recipeId", authenticateUser);
// app.use("/api/user/:id", authenticateUser);
// app.use("/api/user/:id", authenticateUser);

//routes outlines here
app.get("/api/recipe/:id", async (req, res) => {
  //this route works - tested in postman
  console.log("[GET] entering 'recipe/:id' endpoint");
  const id: string = req.params.id;
  try {
    const recipe = await getRecipe(id);
    if (recipe === null) {
      res.status(404).send({
        error: `ERROR: recipe with id: ${id} not found in Firestore`,
      });
    } else {
      res.status(200).send({
        message: `SUCCESS retrieved recipe with id: ${id} from the recipe collection in Firestore`,
        data: recipe,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/recipe/:id endpoint: ${err}`,
    });
  }
});

app.get("/api/recipe/owner/:ownerId", async (req, res) => {
  console.log("[GET] entering 'recipe/:id' endpoint");
  const ownerId: string = req.params.ownerId;
  //console.log(ownerId);
  console.log(
    (await recipeCollectionRef.where("ownerId", "==", ownerId)).get()
  );
  const recipesDoc = (
    await (await recipeCollectionRef.where("ownerId", "==", ownerId)).get()
  ).docs;

  const recipes: SingleRecipeType[] = recipesDoc.map(
    (doc) => doc.data() as SingleRecipeType
  );
  res.status(200).send(recipes);

  // try {
  //   const recipes = await getRecipeOwner(ownerId);
  //   res.status(200).send({
  //     message: `SUCCESS retrieved  from the people collection in Firestore`,
  //     data: recipes,
  //   });
  // } catch (err) {
  //   res.status(500).json({
  //     error: `ERROR: an error occurred in the /api/age/:age endpoint: ${err}`,
  //   });
  // }
});

//POST outline
app.post("/api/recipe/:id", async (req, res) => {
  console.log("[POST] entering '/api/recipe' endpoint");
  const id: string = req.params.id;
  const { recipeName, recipeType, recipeTime, quantities, steps } = req.body;

  // const recipe = await addRecipe(
  //   recipeName,
  //   recipeType,
  //   recipeTime,
  //   quantities,
  //   steps
  // );

  try {
    res.status(200).send({
      message: "Recipe Created Successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/recipes endpoint: ${err}`,
    });
  }
});

//post outline another try
app.post("/api/recipe/take2/:id", async (req, res) => {
  console.log("[POST] entering '/recipe/take2/:id' endpoint");
  const id: string = req.params.id;
  const {
    ownerId,
    idMeal,
    strMeal,
    strMealThumb,
    strSource,
    strCategory,
    quantities,
    postQuantities,
    strInstructions,
  }: SingleRecipeType = req.body;

  const recipe: SingleRecipeType = {
    ownerId: ownerId || undefined,
    idMeal,
    strMeal,
    strMealThumb: strMealThumb || undefined,
    strSource: strSource || undefined,
    strCategory: strCategory || undefined,
    quantities: quantities || undefined,
    postQuantities: postQuantities || undefined,
    strInstructions,
  };

  try {
    await addRecipe2(id, recipe);
    res.status(200).send({
      message: `SUCCESS added recipe with id: ${id} to the recipe collection in Firestore`,
      data: recipe,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/recipe/take2:netid endpoint: ${err}`,
    });
  }
});

//DELETE OUTLINE
app.delete("/api/recipe/:id", async (req, res) => {
  console.log("[DELETE] entering '/recipe/:id' endpoint");
  const id: string = req.params.id;

  try {
    await deleteRecipe(id); // trying to delete but its not there yet
    res.status(200).send({
      message: `SUCCESS deleted meal with id: ${id} from the meal collection in Firestore`,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/recipe/:id endpoint: ${err}`,
    });
  }
});

//user routes
app.get("/api/user/:id", async (req, res) => {
  console.log("[GET] entering 'user/:id' endpoint");
  const id: string = req.params.id;
  try {
    const user = await getUser(id);
    if (user === null) {
      res.status(404).send({
        error: `ERROR: user with id: ${id} not found in Firestore`,
      });
    } else {
      res.status(200).send({
        message: `SUCCESS retrieved user with id: ${id} from the user collection in Firestore`,
        data: user,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/user/:id endpoint: ${err}`,
    });
  }
});

app.put("/api/user/:id/save/:recipeId", async (req, res) => {
  console.log("[PUT] entering '/user/:id/save/:recipeId' endpoint");
  const id: string = req.params.id;
  const recipeId: string = req.params.recipeId;
  try {
    const user = await getUser(id);
    if (user === null) {
      res.status(404).send({
        error: `ERROR: user with id: ${id} not found in Firestore`,
      });
    }
    await addSaveRecipe(id, recipeId);
    res.status(200).send({
      message: `SUCCESS updated saved recipes list with recipe ${recipeId} for user with with id: ${id}`,
      data: recipeId, //can change based on how we use
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/user/:id/save/:recipeId endpoint: ${err}`,
    });
  }
});

//remove recipe from saved recipes
app.put("/api/user/:id/removeSave/:recipeId", async (req, res) => {
  console.log("[PUT] entering '/user/:id/removeSave/:recipeId' endpoint");
  const id: string = req.params.id;
  const recipeId: string = req.params.recipeId;
  try {
    const user = await getUser(id);
    if (user === null) {
      res.status(404).send({
        error: `ERROR: user with id: ${id} not found in Firestore`,
      });
    }
    await deleteSaveRecipe(id, recipeId);
    res.status(200).send({
      message: `SUCCESS updated saved recipes list without recipe ${recipeId} for user with with id: ${id}`,
      data: recipeId, //can change based on how we use
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/user/:id/removeSave/:recipeId endpoint: ${err}`,
    });
  }
});

//add user w/ uid
app.post("/api/user/:userId", async (req, res) => {
  console.log("[POST] entering '/user/:userId' endpoint");
  try {
    const userId = decodeURIComponent(req.params.userId);
    const { uid, email } = req.body;

    const userData = {
      id: uid,
      name: "",
      savedRecipes: [],
    };

    await createUser(userId, userData);
    res.status(201).json({
      message: `SUCCESS added user with id: ${userId} to the user collection in Firestore`,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/user/:userId endpoint: ${err}`,
    });
  }
});

//delete user
app.delete("/api/user/:id", async (req, res) => {
  console.log("[DELETE] entering '/user/:id' endpoint");
  const id: string = req.params.id;

  try {
    await deleteUser(id);
    res.status(200).send({
      message: `SUCCESS deleted user with id: ${id} from the user collection in Firestore`,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/user/:id endpoint: ${err}`,
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
