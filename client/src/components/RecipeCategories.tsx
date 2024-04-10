// // import React from 'react';

// import * as React from 'react';


// interface RecipeCategoriesProps {
//   categories: string[];
// }

// const RecipeCategories: React.FC<RecipeCategoriesProps> = ({ categories }) => {
//   return (
//     <div className="recipe-categories">
//       <h2>Recipe Categories</h2>
//       <div className="category-list">
//         {categories.map((category, index) => (
//           <div key={index} className="category-item">
//             <a href={`/recipes/${category.toLowerCase()}`} className="category-link">
//               {category}
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RecipeCategories;

import * as React from 'react';

interface Category {
  name: string;
  image: string;
}

interface RecipeCategoriesProps {
  categories: Category[];
}

const RecipeCategories: React.FC<RecipeCategoriesProps> = ({ categories }) => {
  return (
    <div className="recipe-categories">
      <h2>Recipe Categories</h2>
      <div className="category-grid">
        {categories.map((category, index) => (
          <div key={index} className="category-item">
            <a href={`/explore?category=${category.name.toLowerCase()}`} className="category-link">
              <img src={category.image} alt={category.name} />
              {category.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeCategories;

