import React, { useContext, useEffect, useState, useCallback } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import Recomended from '../recomended/Recomended';

import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import StartRecipeButton from '../startRecipeButton/StartRecipeButton';
import { fetchById } from '../../services/fetchs_functions';
import './recipeDetails.css';

function RecipeDetails() {
  const { apiType, setApiType, recipeId, setRecipeId } = useContext(AppContext);
  const history = useHistory();
  const [recipe, setRecipe] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [measureList, setMeasureList] = useState([]);
  const [ingredientsAndMeasure, setIngredientsAndMeasure] = useState([]);
  const [embed, setEmbed] = useState('');
  const [isDoneRecipe, setIsDoneRecipe] = useState(false);
  const [isContinueRecipe, setIsContinueRecipe] = useState(true);
  const [isShareClicked, setIsShareClicked] = useState(false);

  useEffect(() => {
    if (ingredientsList.length && measureList.length) {
      const newIngredientsAndMeasure = measureList
        .map((measure, index) => [ingredientsList[index], measure[1]]);
      setIngredientsAndMeasure(newIngredientsAndMeasure);
    }
  }, [ingredientsList, measureList]);

  const getLocalStorageFunc = useCallback((id) => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      if (doneRecipes.find((eachRecipe) => Number(eachRecipe.id) === Number(id))) {
        setIsDoneRecipe(true);
        setIsContinueRecipe(false);
      } else {
        setIsDoneRecipe(false);
        setIsContinueRecipe(false);
      }
    }
  }, []);

  useEffect(() => {
    setRecipeId(history.location.pathname.replace(/\D/g, ''));
    const runFetchId = async () => {
      const id = history.location.pathname.split('/')[2];
      const type = history.location.pathname.split('/')[1];
      const result = await fetchById(type, id);
      setRecipe(result);
      if (type === 'meals') {
        setApiType('Meal');
      }
      if (type === 'drinks') {
        setApiType('Drink');
      }
    };
    runFetchId();
    getLocalStorageFunc(recipeId);
  }, [history.location.pathname, setApiType, setRecipeId, recipeId, getLocalStorageFunc]);

  useEffect(() => {
    const createIngredients = () => {
      if (recipe.length) {
        const object = recipe.map((arrays) => arrays);
        const arrays = Object.entries(object[0]).filter((item) => (
          item[0].startsWith('strIngredient')
        ));
        const ingredients = arrays.filter((item) => item[1]);
        setIngredientsList(ingredients);
      }
    };

    const createMeasures = () => {
      if (recipe.length) {
        const object = recipe.map((arrays) => arrays);
        const arrays = Object.entries(object[0]).filter((item) => (
          item[0].startsWith('strMeasure')
        ));
        const measures = arrays.filter((item) => item[1]);
        setMeasureList(measures);
      }
    };

    const createYoutubeEmbed = () => {
      const indexSplice1 = 3;
      const indexSplice2 = 4;
      if (recipe.length) {
        const youtubeLink = recipe[0].strYoutube;
        const link = youtubeLink.split('/');
        link.splice(indexSplice1, 0, 'embed');
        const id = link[4].split('=');
        link.splice(indexSplice2, 1, id[1]);
        setEmbed(link.join('/'));
      }
    };

    createMeasures();
    createIngredients();
    if (history.location.pathname.includes('/meals')
    && history.location.pathname !== '/meals/52968') { createYoutubeEmbed(); }
  }, [recipe, history.location.pathname]);

  const handleShare = () => {
    copy(`http://localhost:3000${history.location.pathname}`);
    setIsShareClicked(true);
  };

  // const handleFavorites = (id, type, nationality, category, alcoholicOrNot, name, image) => {
  //   const favorite = [
  //     {
  //       id,
  //       type,
  //       nationality,
  //       category,
  //       alcoholicOrNot,
  //       name,
  //       image,
  //     },
  //   ];
  //   localStorage.setItem('favoriteRecipes', JSON.stringify(favorite));
  // };

  return (
    <div className="details-body">
      <h1>Recipe Details</h1>
      {isShareClicked && <h1>Link copied!</h1> }
      <button
        onClick={ handleShare }
        data-testid="share-btn"
      >
        <img src={ shareIcon } alt="btn" />
      </button>
      <button
        data-testid="favorite-btn"
        onClick={ handleFavorites }
      >
        <img src={ whiteHeartIcon } alt="btn" />
      </button>
      {recipe?.map((details, index) => (
        <div key={ index }>
          <img
            data-testid="recipe-photo"
            width="220px"
            height="220px"
            src={ details[`str${apiType}Thumb`] }
            alt={ details[`str${apiType}`] }
          />
          <h2
            data-testid="recipe-title"
          >
            { details[`str${apiType}`] }
          </h2>
          <p
            data-testid="recipe-category"
          >
            {history.location.pathname.includes('/meals')
              ? details.strCategory : details.strAlcoholic }
          </p>
          <ul>
            {ingredientsAndMeasure?.map((ingredient, ingredientsIndex) => (
              <li
                data-testid={ `${ingredientsIndex}-ingredient-name-and-measure` }
                key={ ingredientsIndex }
              >
                <p>
                  {ingredient[0]}
                  {' '}
                  -
                  {' '}
                  {ingredient[1]}
                </p>
              </li>
            ))}
          </ul>
          <p
            data-testid="instructions"
          >
            {details.strInstructions}
          </p>
          {history.location.pathname.includes('/meals') && (
            <iframe
              data-testid="video"
              width="560"
              height="315"
              src={ embed }
              title="YouTube video player"
            />
          )}
          <Recomended />
        </div>
      ))}
      <StartRecipeButton
        isContinueRecipe={ isContinueRecipe }
        isDoneRecipe={ isDoneRecipe }
      />
      {console.log(isContinueRecipe, isDoneRecipe)}
    </div>
  );
}

export default RecipeDetails;
