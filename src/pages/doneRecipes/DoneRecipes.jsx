import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import shareIcon from '../../images/shareIcon.svg';

function DoneRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const doneRecipes = localStorage.getItem('doneRecipes');
    if (doneRecipes) {
      setRecipes(JSON.parse(doneRecipes));
    }
  }, []);

  const shareLink = (id, type) => {
    const baseURL = window.location.href.replace('/done-recipes', '');
    const recipeLink = `${baseURL}/${type}s/${id}`;
    navigator.clipboard.writeText(recipeLink);
    setLinkCopied(true);
  };

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div>
      <Header title="Done Recipes" enableSearchIcon={ false } />

      {linkCopied && <p>Link copied!</p>}

      <button
        data-testid="filter-by-all-btn"
        onClick={ () => changeFilter('all') }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => changeFilter('meal') }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => changeFilter('drink') }
      >
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
        .map((recipe, index) => {
          if (recipe.type === 'meal') {
            return (
              <div key={ index }>
                <Link to={ `${recipe.type}s/${recipe.id}` }>
                  <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
                  <img
                    style={ { width: '180px' } }
                    src={ recipe.image }
                    alt={ recipe.name }
                    data-testid={ `${index}-horizontal-image` }
                  />
                </Link>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${recipe.nationality} - ${recipe.category}`}

                </p>
                <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
                <button onClick={ () => shareLink(recipe.id, recipe.type) }>
                  <img
                    src={ shareIcon }
                    alt={ recipe.name }
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>
                {recipe.tags.slice(0, 2).map((tag, tagIndex) => (
                  <p
                    key={ `${tag}${tagIndex}` }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </p>
                ))}
              </div>
            );
          }
          return (
            <div key={ index }>
              <Link to={ `${recipe.type}s/${recipe.id}` }>
                <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
                <img
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {recipe.alcoholicOrNot}

              </p>
              <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
              <button onClick={ () => shareLink(recipe.id, recipe.type) }>
                <img
                  src={ shareIcon }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
            </div>
          );
        })}
    </div>
  );
}

export default DoneRecipes;
