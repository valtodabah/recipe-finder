import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import Pagination from './components/Pagination';
import Footer from './components/Footer';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchMade, setSearchMade] = useState(false);
  const [loading, setLoading] = useState(false);
  const recipesPerPage = 6;

  const handleSearch = async (query) => {
    setLoading(true);
    setSearchMade(true);
    setError(null);
    await axios.get('https://recipe-finder-v6ta.onrender.com/search', {
      params: {
        q: query
      }
    })
    .then(response => {
      setRecipes(response.data.hits);
      setCurrentPage(1);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching recipes: ', error);
      setError('An error occurred while fetching recipes. Please try again later.');
      setLoading(false);
    });
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Recipe Finder</h1>
        <p className="text-center text-lg text-gray-500 mb-8">Search for recipes by entering a query below.</p>
        <div className="flex justify-center mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>
        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {loading && (
          <p className="text-center text-lg text-gray-500">Loading...</p>
        )}
        {searchMade && recipes.length === 0 && !error && !loading && (
          <p className="text-center text-lg text-gray-500">No recipes found. Please try searching for something else.</p>
        )}
        {recipes.length > 0 && (
          <>
            <RecipeList recipes={recipes} currentPage={currentPage} recipesPerPage={recipesPerPage} />
            <Pagination totalRecipes={recipes.length} recipesPerPage={recipesPerPage} currentPage={currentPage} onPageChange={onPageChange} />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;