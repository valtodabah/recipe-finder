from flask import Flask, request, jsonify
from flask_cors import CORS
import meilisearch
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

meilisearch_url = os.getenv('MEILISEARCH_URL')
meilisearch_key = os.getenv('MEILI_MASTER_KEY')

client = meilisearch.Client(meilisearch_url, meilisearch_key)
index = client.index('recipes')

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('q', '')
    filters = []
    cooking_time = request.args.get('cooking_time')
    page = int(request.args.get('page', 1))
    hits_per_page = int(request.args.get('limit', 20))
    offset = (page - 1) * hits_per_page

    if cooking_time:
        filters.append(f'cooking_time<={cooking_time}')

    filters_string = " AND ".join(filters)
    search_params = {
        'filter': filters_string,
        'limit': hits_per_page,
        'offset': offset
    }

    result = index.search(query, search_params)

    response = {
        'hits': result['hits'],
        'total': result['estimatedTotalHits'], # total number of matching recipes
    }

    return jsonify(response)

if __name__ == '__main__':
    # Get the port from the environment variable or default to 5000
    port = int(os.environ.get('PORT', 5000))
    
    # Run the app on 0.0.0.0 so it's accessible from outside the container
    app.run(host='0.0.0.0', port=port)

    # app.run(debug=True)