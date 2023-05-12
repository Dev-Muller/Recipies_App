import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    if (favoriteRecipes) {
      setRecipes(JSON.parse(favoriteRecipes));
    }
  }, []);

  const shareLink = (id, type) => {
    const baseURL = window.location.href.replace('/favorite-recipes', '');
    const recipeLink = `${baseURL}/${type}s/${id}`;
    navigator.clipboard.writeText(recipeLink);
    setLinkCopied(true);
  };

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const changeFavorite = (id) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(updatedRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedRecipes));
  };

  return (
    <div>
      <Header title="Favorite Recipes" enableSearchIcon={ false } />

      {linkCopied && <p>Link copied!</p>}

      <button data-testid="filter-by-all-btn" onClick={ () => changeFilter('all') }>
        All
      </button>
      <button data-testid="filter-by-meal-btn" onClick={ () => changeFilter('meal') }>
        Meals
      </button>
      <button data-testid="filter-by-drink-btn" onClick={ () => changeFilter('drink') }>
        Drinks
      </button>

      {recipes
        .filter((recipe) => {
          if (filter === 'all') {
            return true;
          } if (filter === 'meal') {
            return recipe.type === 'meal';
          } if (filter === 'drink') {
            return recipe.type === 'drink';
          }
          return false;
        })
        .map((recipe, index) => (
          <div key={ index }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
                width="200"// adicionado width, refatorar depois no css
              />
              <p data-testid={ `${index}-horizontal-top-text` }>
                {recipe.type === 'meal'
                  ? `${recipe.nationality} - ${recipe.category}`
                  : `${recipe.alcoholicOrNot} - ${recipe.category}`}
              </p>
              <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
            </Link>

            <button
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              onClick={ () => shareLink(recipe.id, recipe.type) }
            >
              <img src={ shareIcon } alt="Share" />
            </button>
            <button
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              onClick={ () => changeFavorite(recipe.id) }
            >
              <img src={ blackHeartIcon } alt="Favorite" />
            </button>
          </div>
        ))}
    </div>
  );
}

export default FavoriteRecipes;
