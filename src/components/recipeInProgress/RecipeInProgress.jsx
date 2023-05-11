import React from 'react';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function RecipeInProgress() {
  return (
    <div>
      <h1>In Progress</h1>
      <button
        data-testid="share-btn"
      >
        <img src={ shareIcon } alt="btn" />
      </button>
      <button
        data-testid="favorite-btn"
      >
        <img src={ whiteHeartIcon } alt="btn" />
      </button>
    </div>
  );
}

export default RecipeInProgress;
