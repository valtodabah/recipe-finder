import pandas as pd
import json
import numpy as np

def prepare_data():
    # Read data
    recipes_df = pd.read_csv('RAW_recipes.csv')

    # Select and rename relevant columns
    recipes_df = recipes_df[['id', 'name', 'minutes', 'tags', 'steps', 'description', 'ingredients']]
    recipes_df = recipes_df.rename(columns={'id': 'id', 'name': 'title', 'minutes': 'cooking_time', 'tags': 'tags', 'steps': 'steps', 'description': 'description', 'ingredients': 'ingredients'})

    # Convert tags, steps, and ingredients to lists
    recipes_df['tags'] = recipes_df['tags'].apply(eval)
    recipes_df['steps'] = recipes_df['steps'].apply(eval)
    recipes_df['ingredients'] = recipes_df['ingredients'].apply(eval)

    # Fill empty descriptions with empty strings
    recipes_df['description'] = recipes_df['description'].fillna('')

    # Replace NaN values in titles with empty strings
    recipes_df['title'] = recipes_df['title'].fillna('')
    recipes_df['title'] = recipes_df['title'].astype(str)

    # Replace NaN values in cooking_time with 0
    recipes_df['cooking_time'] = recipes_df['cooking_time'].replace([np.inf, -np.inf], np.nan)
    recipes_df['cooking_time'] = recipes_df['cooking_time'].fillna(0)

    # Ensure cooking time is an integer
    recipes_df['cooking_time'] = recipes_df['cooking_time'].astype(int)

    # Convert dataframe to list of dictionaries
    recipes = recipes_df.to_dict(orient='records')

    # Remove NaN values in the dictionary
    clean_recipes = []
    for recipe in recipes:
        for key, value in recipe.items():
            if isinstance(value, float) and (np.isnan(value) or np.isinf(value)):
                recipe[key] = None
        clean_recipes.append(recipe)
    
    # test_recipes = clean_recipes[:100] # Use only the first 100 recipes for testing

    # Save test data to JSON file
    # with open('test_recipes.json', 'w', encoding='utf-8') as f:
        # json.dump(test_recipes, f, ensure_ascii=False)

    # Save data to JSON file
    with open('recipes.json', 'w') as f:
        json.dump(clean_recipes, f)

if __name__ == '__main__':
    prepare_data()