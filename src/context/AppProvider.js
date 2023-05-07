import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [apiData, setApiData] = useState([]);

  const fetchMealsApi = async (radio, searchElement) => {
    let URL = '';
    switch (radio) {
    case 'ingredient':
      URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchElement}`;
      break;
    case 'name':
      URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchElement}`;
      break;
    case 'first-letter':
      URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchElement}`;
      break;
    default:
      break;
    }
    const response = await fetch(URL);
    const result = await response.json();
    setApiData(result.meals);
  };

  const fetchDrinksApi = async (radio, searchElement) => {
    let URL = '';
    switch (radio) {
    case 'ingredient':
      URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchElement}`;
      break;
    case 'name':
      URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchElement}`;
      break;
    case 'first-letter':
      URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchElement}`;
      break;
    default:
      break;
    }
    const response = await fetch(URL);
    const result = await response.json();
    setApiData(result.drinks);
  };

  const values = useMemo(() => ({
    apiData,
    login,
    setLogin,
    fetchMealsApi,
    fetchDrinksApi,
  }), [login, apiData]);

  return (
    <AppContext.Provider value={ values }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default AppProvider;
