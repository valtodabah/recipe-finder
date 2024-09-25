import meilisearch
import json
import math
from dotenv import load_dotenv
import os

load_dotenv()

def index_data():
    meilisearch_url = os.getenv('MEILISEARCH_URL')
    meilisearch_key = os.getenv('MEILI_MASTER_KEY')

    # Connect to MeiliSearch
    client = meilisearch.Client(meilisearch_url, meilisearch_key)
    index = client.index('recipes')

    # Read data
    with open('recipes.json', 'r') as f:
        recipes = json.load(f)

    batch_size = 10000 # Number of documents to index at a time

    total_recipes = len(recipes)
    total_batches = math.ceil(total_recipes / batch_size)

    print(f"Total recipes: {total_recipes}")
    print(f"Batch size: {batch_size}")
    print(f"Total batches: {total_batches}")

    for i in range(total_batches):
        start = i * batch_size
        end = start + batch_size
        batch = recipes[start:end]
        print(f"Indexing batch {i + 1}/{total_batches} ({len(batch)} recipes)...")
        try:
            task = index.add_documents(batch)
            task_uid = task.task_uid

            print(f"Batch {i + 1} enqueued with task UID: {task_uid}")
        except meilisearch.errors.MeiliSearchApiError as e:
            print(f"Failed to index batch {i + 1}: {e}")
    print("Done indexing!")

    # Configure searchable attributes
    task = index.update_searchable_attributes(['title', 'tags', 'ingredients', 'description'])
    print(f"Searchable attributes updated with task UID: {task.task_uid}")

    # Configure filterable attributes
    task = index.update_filterable_attributes(['tags', 'cooking_time'])
    print(f"Filterable attributes updated with task UID: {task.task_uid}")

    task = index.update_typo_tolerance({
        'enabled': True,
        'minWordSizeForTypos': {
            'oneTypo': 4,
            'twoTypos': 8
        }
    })
    print(f"Typo tolerance updated with task UID: {task.task_uid}")

if __name__ == '__main__':
    index_data()