// // const HomePage = () => <h1>Welcome to the Homepage!</h1>;

// // import React from 'react';
// import FeaturedRecipes from '../components/FeaturedRecipes';
// import RecipeCategories from '../components/RecipeCategories';

// const HomePage = () => {
//   return (
//     <div className="home-page">
//       <FeaturedRecipes />
//       <RecipeCategories />
//       {/* Other sections/components */}
//     </div>
//   );
// };

// // export default HomePage;

// import React from 'react';
// import FeaturedRecipes from '../components/FeaturedRecipes';

// const HomePage: React.FC = () => {
//   // Define your list of featured recipes
//   const featuredRecipes = [
//     // Your array of recipe objects
//     // Example:
//     {
//       id: 1,
//       title: 'Savory Chicken Curry',
//       description: 'A flavorful chicken curry with spices from around the world.',
//       image: 'https://example.com/chicken_curry.jpg',
//     },
//     // More recipe objects...
//   ];

//   return (
//     <div className="home-page">
//       {/* Pass the featuredRecipes array as the 'recipes' prop to the FeaturedRecipes component */}
//       <FeaturedRecipes recipes={featuredRecipes} />
//       {/* Other components/sections */}
//     </div>
//   );
// };

// export default HomePage;

// import React from 'react';
import * as React from "react";
import { useState, useEffect } from "react";
import FeaturedRecipes from "../components/FeaturedRecipes";
import RecipeCategories from "../components/RecipeCategories";
import SavedRecipes from "../components/SavedRecipes";
import "../HomePage.css";
import { useAuth } from "../auth/AuthUserProvider";

const HomePage: React.FC = () => {
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  //will be able to fully implement this once we have auth and know our curr user
  const { user } = useAuth();

  useEffect(() => {
    // Fetch the user's saved recipes from the server
    //const userId = '1' //placeholder until we add authentication
    if (user?.displayName) {
      const encodedId = encodeURIComponent(user.displayName);
      console.log("encodedId" + encodedId);

      const fetchSavedRecipes = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/api/user/${encodedId}`
          );
          if (response.ok) {
            const data = await response.json();

            setSavedRecipes(data.data.savedRecipes);
          } else {
            console.error("Failed to fetch saved recipes");
          }
        } catch (error) {
          console.error("Error fetching saved recipes:", error);
        }
      };

      fetchSavedRecipes();
    }
  }, [user?.displayName]); //only do once

  const featuredRecipes = [
    {
      id: 1,
      title: "Savory Chicken Curry",
      description:
        "A flavorful chicken curry with spices from around the world.",
      image: "/img1.jpeg",
    },
    {
      id: 2,
      title: "Burrito",
      description: "A flavorful burrito with spices from around the world.",
      image: "/img2.jpeg",
    },
    {
      id: 3,
      title: "Savory Chicken Curry",
      description:
        "A flavorful chicken curry with spices from around the world.",
      image: "/img1.jpeg",
    },
    {
      id: 4,
      title: "Savory Chicken Curry",
      description:
        "A flavorful chicken curry with spices from around the world.",
      image: "/img1.jpeg",
    },
  ];

  const categories = [
    {
      name: "Breakfast",
      image: "/img2.jpeg",
    },
    {
      name: "Appetizer",
      image: "/img2.jpeg",
    },
    {
      name: "Lunch",
      image: "/img2.jpeg",
    },
    {
      name: "Dinner",
      image: "/img2.jpeg",
    },
    {
      name: "Dessert",
      image: "/img2.jpeg",
    },
  ];
  console.log(savedRecipes);
  return (
    <div className="home-page">
      <FeaturedRecipes recipes={featuredRecipes} />
      <SavedRecipes savedRecipes={savedRecipes} />
      <RecipeCategories categories={categories} />
    </div>
  );
};
//need to add savedRecipes in return - can either replace featured recipes or add another section
// <FeaturedRecipes recipes={savedRecipes}

export default HomePage;
