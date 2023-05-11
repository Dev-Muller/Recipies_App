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
      console.log('Olá', searchElement);
      const data = await fetchApi(radio, 'themealdb', searchElement);
      setApiData(data);
    }
    if (history.location.pathname === '/drinks') {
      // console.log('Oiá', searchElement);
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
        placeholder="search"
        onChange={ ({ target }) => setSearchInput(target.value) }
      />
      <div className="radios">
        <div>
          <input
            id="ingredient"
            name="radioBtn"
            value="ingredient"
            data-testid="ingredient-search-radio"
            type="radio"
            onChange={ ({ target }) => setRadioBtn(target.value) }
          />
          <label htmlFor="ingredient">
            Ingredient
          </label>
        </div>
        <div>
          <input
            id="name"
            name="radioBtn"
            value="name"
            data-testid="name-search-radio"
            type="radio"
            onChange={ ({ target }) => setRadioBtn(target.value) }
          />
          <label htmlFor="name">
            Name
          </label>
        </div>
        <div>
          <input
            id="first-letter"
            name="radioBtn"
            value="first-letter"
            data-testid="first-letter-search-radio"
            type="radio"
            onChange={ ({ target }) => setRadioBtn(target.value) }
          />
          <label htmlFor="first-letter">
            First letter
          </label>
        </div>
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
