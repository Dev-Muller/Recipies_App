import React from 'react';

function SearchBar() {
  return (
    <div className="search-bar-container">
      <input
        data-testid="search-input"
        type="text"
      />
      <button>Pesquisar</button>
    </div>
  );
}

export default SearchBar;
