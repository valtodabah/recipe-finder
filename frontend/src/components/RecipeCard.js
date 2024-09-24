import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

function RecipeCard({ recipe }) {
    return (
        <Card className="w-full max-w-md border-2 border-primary">
          <CardHeader className="border-b border-primary">
            <CardTitle className="text-xl font-bold">{recipe.title}</CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-primary">
            <div className="py-4">
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Cooking time:</strong> {recipe.cooking_time} minutes
              </p>
              <p className="text-sm">{recipe.description}</p>
            </div>
            <div className="py-4">
              <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
              <ul className="list-disc list-inside">
                {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-sm mb-1">{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="py-4">
              <h3 className="text-lg font-semibold mb-2">Steps:</h3>
              <ol className="list-decimal list-inside">
                {recipe.steps && recipe.steps.map((step, index) => (
                  <li key={index} className="text-sm mb-2">{step}</li>
                ))}
              </ol>
            </div>
          </CardContent>
        </Card>
      );
}

export default RecipeCard;