export const fetchApi = async (radio, server, searchElement) => {
  let URL = '';
  switch (radio) {
  case 'ingredient':
    URL = `https://www.${server}.com/api/json/v1/1/filter.php?i=${searchElement}`;
    break;
  case 'name':
    URL = `https://www.${server}.com/api/json/v1/1/search.php?s=${searchElement}`;
    break;
  default:
    URL = `https://www.${server}.com/api/json/v1/1/search.php?f=${searchElement}`;
    break;
  // default:
  //   break;
  }
  console.log(URL);
  const response = await fetch(URL);
  const result = await response.json();
  if (server === 'themealdb') return result.meals;
  if (server === 'thecocktaildb') return result.drinks;
};

export const fetchById = async (type, id) => {
  let URL = '';
  switch (type) {
  case 'meals':
    URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    break;
  default:
    URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    break;
  // default:
  //   break;
  }
  const response = await fetch(URL);
  const result = await response.json();
  if (type === 'meals') return result.meals;
  if (type === 'drinks') return result.drinks;
};

export const fetchFullRecipe = async (type) => {
  let URL = '';
  switch (type) {
  case 'Meal':
    URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    break;
  case 'Drink':
    URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    break;
  default:
    break;
  }
  const response = await fetch(URL);
  const result = await response.json();
  if (type === 'Meal') return result.meals;
  if (type === 'Drink') return result.drinks;
};

export const fetchCategories = async (type) => {
  let URL = '';
  switch (type) {
  case 'meals':
    URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    break;
  default:
    URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    break;
  // default:
  //   break;
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
  default:
    URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    break;
  // default:
  //   break;
  }
  const response = await fetch(URL);
  const result = await response.json();
  if (type === 'meals') return result.meals;
  if (type === 'drinks') return result.drinks;
};

export const fetchRecomendation = async (type) => {
  let URL = '';
  switch (type) {
  case 'Meal':
    URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    break;
  default:
    URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    break;
  // default:
  //   break;
  }
  const response = await fetch(URL);
  const result = await response.json();
  if (type === 'Meal') return result.drinks;
  if (type === 'Drink') return result.meals;
};
