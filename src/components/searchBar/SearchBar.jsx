import React from 'react';
import './searchBar.css';

function SearchBar() {
  return (
    <div className="search-bar-container">
      <input
        className="input-search"
        data-testid="search-input"
        type="text"
      />
      <div className="radios">
        <input data-testid="ingredient-search-radio" type="radio" />
        <input data-testid="name-search-radio" type="radio" />
        <input data-testid="first-letter-search-radio" type="radio" />
      </div>
      <button data-testid="exec-search-btn">Search</button>
    </div>
  );
}

export default SearchBar;
