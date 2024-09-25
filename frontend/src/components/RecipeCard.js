import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

function RecipeCard({ recipe }) {
  return (
    <Card className="w-full max-w-md overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_30px_rgba(0,0,0,0.15)] transition-all duration-300 ease-in-out bg-white rounded-xl">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
        <CardTitle className="text-2xl font-bold text-primary">{recipe.title}</CardTitle>
        <p className="text-sm text-muted-foreground mt-2 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span className="font-semibold">Cooking time: </span>{recipe.cooking_time} minutes
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div>
          <p className="text-sm leading-relaxed text-gray-600">{recipe.description}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3 text-primary flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            Ingredients
          </h3>
          <ul className="space-y-2">
            {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-sm flex items-start text-gray-600">
                <span className="text-primary mr-2">•</span>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3 text-primary flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            Steps
          </h3>
          <ol className="space-y-3">
            {recipe.steps && recipe.steps.map((step, index) => (
              <li key={index} className="text-sm flex items-start text-gray-600">
                <span className="font-bold text-primary mr-2 min-w-[20px]">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}

export default RecipeCard;