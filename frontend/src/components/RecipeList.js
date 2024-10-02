import React from 'react';
import RecipeCard from './RecipeCard';

function RecipeList({ recipes, currentPage, recipesPerPage }) {
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    return (
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {currentRecipes.map((recipe) => (
          <div key={recipe.id} className="break-inside-avoid">
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
      );
}

export default RecipeList;