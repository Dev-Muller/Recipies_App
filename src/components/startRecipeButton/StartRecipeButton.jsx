import React from 'react';
import './startRecipeButton.css';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

function StartRecipeButton({ isContinueRecipe, isDoneRecipe }) {
  const history = useHistory();

  return (
    <Link to={ `${history.location.pathname}/in-progress` }>
      <button
        className={ !isDoneRecipe ? 'start-recipe-btn' : 'start-btn-off' }
        data-testid="start-recipe-btn"
      >
        { !isContinueRecipe ? 'Start Recipe' : 'Continue Recipe'}
      </button>
    </Link>

  );
}

StartRecipeButton.propTypes = {
  isContinueRecipe: PropTypes.bool.isRequired,
  isDoneRecipe: PropTypes.bool.isRequired,
};

export default StartRecipeButton;
