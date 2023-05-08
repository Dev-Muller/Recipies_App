export const fetchApi = async (radio, server, searchElement) => {
  let URL = '';
  switch (radio) {
  case 'ingredient':
    URL = `https://www.${server}.com/api/json/v1/1/filter.php?i=${searchElement}`;
    break;
  case 'name':
    URL = `https://www.${server}.com/api/json/v1/1/search.php?s=${searchElement}`;
    break;
  case 'first-letter':
    URL = `https://www.${server}.com/api/json/v1/1/search.php?f=${searchElement}`;
    break;
  default:
    break;
  }
  const response = await fetch(URL);
  const result = await response.json();
  if (server === 'themealdb') return result.meals;
  if (server === 'thecocktaildb') return result.drinks;
};

export const fetchById = async (type, id) => {
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
  if (type === 'meals') return result.meals;
  if (type === 'drinks') return result.drinks;
};

export const fetchFullRecipe = async (type) => {
  let URL = '';
  switch (type) {
  case 'meals':
    URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    break;
  case 'drinks':
    URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    break;
  default:
    break;
  }
  const response = await fetch(URL);
  const result = await response.json();
  if (type === 'meals') return result.meals;
  if (type === 'drinks') return result.drinks;
};

export const fetchCategories = async (type) => {
  let URL = '';
  switch (type) {
  case 'meals':
    URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    break;
  case 'drinks':
    URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    break;
  default:
    break;
  }
  const response = await fetch(URL);
  const result = await response.json();
  if (type === 'meals') return result.meals;
  if (type === 'drinks') return result.drinks;
};

export const fetchCategoriesList = async (type, category) => {
  let URL = '';
  switch (type) {
  case 'meals':
    URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    break;
  case 'drinks':
    URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    break;
  default:
    break;
  }
  const response = await fetch(URL);
  const result = await response.json();
  if (type === 'meals') return result.meals;
  if (type === 'drinks') return result.drinks;
};
