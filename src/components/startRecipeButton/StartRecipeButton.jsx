import React, { useCallback, useContext, useEffect, useState } from 'react';
import './startRecipeButton.css';
import { Link, useHistory } from 'react-router-dom';
import AppContext from '../../context/AppContext';

function StartRecipeButton() {
  const inProgress = 'in-progress';
  const history = useHistory();
  const id = history.location.pathname.split('/')[2];

  const { recipeId, isAllChecked } = useContext(AppContext);
  const [doneRecipe, setDoneRecipe] = useState(false);
  const [continueRecipe, setContinueRecipe] = useState(true);
  const [finishRecipe, setFinishRecipe] = useState(false);
  const [apiType, setApiType] = useState('');

  const getStoredStarted = () => {
    const type = history.location.pathname.split('/')[1];
    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      const obj = {
        drinks: {
        },
        meals: {
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));

      const hasKey = Object.keys(JSON.parse(localStorage
        .getItem('inProgressRecipes'))[type]).includes(id);
      if (!hasKey) {
        const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
        const newObj = {
          ...inProgressRecipes,
          [type]: {
            ...inProgressRecipes[type],
            [id]: [],
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(newObj));
      }
    }
  };

  const createApiType = useCallback(() => {
    const type = history.location.pathname.split('/')[1];
    if (type === 'meals') {
      setApiType('Meal');
    }
    if (type === 'drinks') {
      setApiType('Drink');
    }
  }, [history.location.pathname]);

  const getLocalStorageFunc = useCallback((recipeid) => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      if (doneRecipes.find((eachRecipe) => Number(eachRecipe.id) === Number(recipeid))) {
        setDoneRecipe(true);
        setContinueRecipe(false);
      } else {
        setDoneRecipe(false);
        setContinueRecipe(false);
      }
    }
  }, []);

  useEffect(() => {
    createApiType();
    getLocalStorageFunc(recipeId);
    if (!history.location.pathname.includes(inProgress)) {
      setFinishRecipe(false);
      setContinueRecipe(false);
    }
    if (JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      const recipeStoraged = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const type = history.location.pathname.split('/')[1];
      const recipeFound = Object.keys(recipeStoraged[type]).includes(id);
      if (recipeFound) {
        setContinueRecipe(true);
      } else {
        setContinueRecipe(false);
      }
    }
    if (history.location.pathname.includes(inProgress)) {
      setFinishRecipe(true);
      setContinueRecipe(false);
    }
  }, [
    getLocalStorageFunc, createApiType, id,
    recipeId, history.location.pathname, apiType,
  ]);

  const handleClick = () => {
    getStoredStarted();
  };
  const limit = 1;
  const path = history.location.pathname.split('/').slice(0, limit).join('/');
  return (
    <Link
      to={ finishRecipe
        ? `${path}/done-recipes` : `${history.location.pathname}/in-progress` }
    >
      <button
        className={ doneRecipe ? 'start-btn-off' : 'start-recipe-btn' }
        data-testid={ finishRecipe ? 'finish-recipe-btn' : 'start-recipe-btn' }
        onClick={ handleClick }
        disabled={ !isAllChecked }
      >
        {continueRecipe && 'Continue Recipe'}
        {finishRecipe && !doneRecipe && !continueRecipe && 'Finish Recipe'}
        {!continueRecipe && !finishRecipe && 'Start Recipe'}
      </button>
    </Link>
  );
}

export default StartRecipeButton;
