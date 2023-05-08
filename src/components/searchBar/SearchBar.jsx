import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchApi } from '../../services/fetchs_functions';
import AppContext from '../../context/AppContext';
import './searchBar.css';

function SearchBar() {
  const { setIsClicked, setApiData } = useContext(AppContext);
  const [searchInput, setSearchInput] = useState('');
  const [radioBtn, setRadioBtn] = useState('');
  const history = useHistory();

  const handleClick = async (radio, searchElement) => {
    setIsClicked(true);
    if (radio === 'first-letter' && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    if (history.location.pathname === '/meals') {
      const data = await fetchApi(radio, 'themealdb', searchElement);
      setApiData(data);
    }
    if (history.location.pathname === '/drinks') {
      const data = await fetchApi(radio, 'thecocktaildb', searchElement);
      setApiData(data);
    }
  };

  return (
    <div className="search-bar-container">
      <input
        name="searchInput"
        className="input-search"
        data-testid="search-input"
        type="text"
        onChange={ ({ target }) => setSearchInput(target.value) }
      />
      <div className="radios">
        <label>
          <input
            name="radioBtn"
            value="ingredient"
            data-testid="ingredient-search-radio"
            type="radio"
            onChange={ ({ target }) => setRadioBtn(target.value) }
          />
          Ingredient
        </label>
        <label>
          <input
            name="radioBtn"
            value="name"
            data-testid="name-search-radio"
            type="radio"
            onChange={ ({ target }) => setRadioBtn(target.value) }
          />
          Name
        </label>
        <label>
          <input
            name="radioBtn"
            value="first-letter"
            data-testid="first-letter-search-radio"
            type="radio"
            onChange={ ({ target }) => setRadioBtn(target.value) }
          />
          First letter
        </label>
      </div>
      <button
        data-testid="exec-search-btn"
        onClick={ () => handleClick(radioBtn, searchInput) }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
