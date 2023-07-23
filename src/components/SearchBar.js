import React, { useState } from 'react';
import '../styles/SearchBar.css'; 

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    const inputText = event.target.value;
    setSearchTerm(inputText);
    onSearch(inputText); // Trigger search as user types
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    onSearch(''); // Clear the search
  };

  return (
    <div className="search-container">
      <input
        id='search'
        type="text"
        placeholder="Catch a Pokémon..."
        value={searchTerm}
        onChange={handleInputChange}
        className="search-input"
      />
      {searchTerm && (
        <button onClick={handleClearSearch} className="clear-button">
          Clear
        </button>
      )}
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
