// import React from 'react';

// interface Recipe {
//   id: number;
//   title: string;
//   description: string;
//   image: string;
// }

// interface FeaturedRecipesProps {
//   recipes: Recipe[];
// }

// const FeaturedRecipes: React.FC<FeaturedRecipesProps> = ({ recipes }) => {
//   return (
//     <div className="featured-recipes">
//       <h2>Featured Recipes</h2>
//       <div className="recipe-list">
//         {recipes.map(recipe => (
//           <div key={recipe.id} className="recipe-card">
//             <img src={recipe.image} alt={recipe.title} />
//             <h3>{recipe.title}</h3>
//             <p>{recipe.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FeaturedRecipes;


// import React from 'react';
import * as React from 'react';
import '../HomePage.css'; // Import CSS file for styling

interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface FeaturedRecipesProps {
  recipes: Recipe[];
}

const FeaturedRecipes: React.FC<FeaturedRecipesProps> = ({ recipes }) => {
  return (
    <div className="featured-recipes">
      <h1>Welcome to your Recipe Diary</h1>
      <p>Please explore below to go to your desired page.</p>
      <h2>Featured Recipes</h2>
      <div className="recipe-list">
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.title} />
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedRecipes;

