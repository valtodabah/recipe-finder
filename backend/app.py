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
    filters = request.args.get('filters', '')
    page = int(request.args.get('page', 1))
    hits_per_page = int(request.args.get('limit', 20))
    offset = (page - 1) * hits_per_page

    search_params = {
        'filter': filters,
        'limit': hits_per_page,
        'offset': offset
    }

    result = index.search(query, search_params)

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)