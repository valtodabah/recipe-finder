import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from "../ui/button"
import { Input } from '../ui/input';

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');
    const [cookingTime, setCookingTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query, cookingTime);
    };

    return (
        <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Search for recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Max cooking time (minutes)"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
          />
          <Button type="submit">
            <Search className="h-4 w-4" />
          </Button>
        </form>
    );
}

export default SearchBar;