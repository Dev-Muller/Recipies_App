import React, { useCallback, useContext, useEffect, useState } from 'react';
import './startRecipeButton.css';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppContext from '../../context/AppContext';

function StartRecipeButton({ recipeData }) {
  console.log(recipeData);
  const inProgress = 'in-progress';
  const history = useHistory();
  const { recipeId } = useContext(AppContext);
  const [doneRecipe, setDoneRecipe] = useState(false);
  const [continueRecipe, setContinueRecipe] = useState(true);
  const [finishRecipe, setFinishRecipe] = useState(false);
  const [apiType, setApiType] = useState('');

  const getStoredStarted = () => {
    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      localStorage.setItem('inProgressRecipes', JSON.stringify([]));
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
    const id = history.location.pathname.split('/')[2];
    getStoredStarted();
    createApiType();
    getLocalStorageFunc(recipeId);
    if (!history.location.pathname.includes(inProgress)) {
      setFinishRecipe(false);
      setContinueRecipe(false);
    }
    if (JSON.parse(localStorage.getItem('inProgressRecipes')).length > 0) {
      const recipeStoraged = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const recipeFound = recipeStoraged.find((recipeid) => recipeid === id);
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
    getLocalStorageFunc, createApiType,
    recipeId, history.location.pathname, apiType,
  ]);

  const handleClick = () => {
    const id = history.location.pathname.split('/')[2];

    if (JSON.parse(localStorage.getItem('inProgressRecipes')).length > 0) {
      const startedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const idDiferent = startedRecipes.filter((itemId) => itemId !== id);
      // console.log(idDiferent);
      if (idDiferent) {
        localStorage
          .setItem('inProgressRecipes', JSON.stringify([...idDiferent, id]));
      }
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify([id]));
    }
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
        {/* {console.log(continueRecipe, finishRecipe, doneRecipe)} */}
      </button>
    </Link>
  );
}

StartRecipeButton.propTypes = {
  recipeData: PropTypes.shape({}).isRequired,
};

export default StartRecipeButton;
