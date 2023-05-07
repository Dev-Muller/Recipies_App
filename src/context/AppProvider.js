import { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const verifyApiData = () => {
      if (apiData === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    };
    verifyApiData();
  });

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

  const fetchFullMeal = useCallback(async (type, id) => {
    let URL = '';
    switch (type) {
    case 'meals':
      URL = `www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      break;
    case 'drinks':
      URL = `www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      break;
    default:
      break;
    }
    const response = await fetch(URL);
    const result = response.json();
    if (type === 'meals') { apiData(result.meals); }
    if (type === 'drinks') { apiData(result.drinks); }
  }, [apiData]);

  const values = useMemo(() => ({
    apiData,
    login,
    setLogin,
    fetchFullMeal,
    fetchMealsApi,
    fetchDrinksApi,
  }), [login, apiData, fetchFullMeal]);

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
