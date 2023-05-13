import React, { useCallback, useContext, useEffect, useState } from 'react';
import './startRecipeButton.css';
import { Link, useHistory } from 'react-router-dom';
// import PropTypes from 'prop-types';
import AppContext from '../../context/AppContext';

function StartRecipeButton() { // receber a prop recipeData para povoar o objeto
  // console.log(recipeData);
  const inProgress = 'in-progress';
  const history = useHistory();
  const { recipeId } = useContext(AppContext);
  const [doneRecipe, setDoneRecipe] = useState(false);
  const [continueRecipe, setContinueRecipe] = useState(true);
  const [finishRecipe, setFinishRecipe] = useState(false);
  const [apiType, setApiType] = useState('');

  const getStoredStarted = () => {
    const id = history.location.pathname.split('/')[2];
    const type = history.location.pathname.split('/')[1];
    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      const obj = {
        [type]: {
          [id]: [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    }

    const hasKey = Object.keys(JSON.parse(localStorage
      .getItem('inProgressRecipes'))[type]).includes(id);
    if (!hasKey) {
      console.log('entrou');
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

  const getLocalStorageFunc = useCallback((id) => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      if (doneRecipes.find((eachRecipe) => Number(eachRecipe.id) === Number(id))) {
        setDoneRecipe(true);
        setContinueRecipe(false);
      } else {
        setDoneRecipe(false);
        setContinueRecipe(false);
      }
    }
  }, []);

  useEffect(() => {
    // const id = history.location.pathname.split('/')[2];
    createApiType();
    getLocalStorageFunc(recipeId);
    if (!history.location.pathname.includes(inProgress)) {
      setFinishRecipe(false);
      setContinueRecipe(false);
    }
    if (JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      // const recipeStoraged = JSON.parse(localStorage.getItem('inProgressRecipes'));
      // const type = history.location.pathname.split('/')[1];
    //   const recipeFound = Object.keys(recipeStoraged[type]).includes(id);
    //   if (recipeFound) {
    //     setContinueRecipe(true);
    //   } else {
    //     setContinueRecipe(false);
    //   }
    }
    if (history.location.pathname.includes(inProgress)) {
      setFinishRecipe(true);
      setContinueRecipe(false);
    }
  }, [
    getLocalStorageFunc, createApiType,
    recipeId, history.location.pathname, apiType,
  ]);

  const handleClick = () => {
    getStoredStarted();
  };

  return (
    <Link to={ `${history.location.pathname}/in-progress` }>
      <button
        className={ doneRecipe ? 'start-btn-off' : 'start-recipe-btn' }
        data-testid={ finishRecipe ? 'finish-recipe-btn' : 'start-recipe-btn' }
        onClick={ handleClick }
      >
        {continueRecipe && 'Continue Recipe'}
        {finishRecipe && !doneRecipe && !continueRecipe && 'Finish Recipe'}
        {!continueRecipe && !finishRecipe && 'Start Recipe'}
      </button>
    </Link>
  );
}

// StartRecipeButton.propTypes = {
//   recipeData: PropTypes.shape({}).isRequired,
// };

export default StartRecipeButton;
