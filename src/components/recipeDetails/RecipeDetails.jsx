import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchById } from '../../services/fetchs_functions';
import AppContext from '../../context/AppContext';
import Recomended from '../recomended/Recomended';
import './recipeDetails.css';
import StartRecipeButton from '../recipeButton/StartRecipeButton';

function RecipeDetails() {
  const { apiType, setApiType } = useContext(AppContext);
  const history = useHistory();
  const [recipe, setRecipe] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [measureList, setMeasureList] = useState([]);
  const [ingredientsAndMeasure, setIngredientsAndMeasure] = useState([]);
  const [embed, setEmbed] = useState('');

  useEffect(() => {
    if (ingredientsList.length && measureList.length) {
      const newIngredientsAndMeasure = measureList
        .map((measure, index) => [ingredientsList[index], measure[1]]);
      setIngredientsAndMeasure(newIngredientsAndMeasure);
    }
  }, [ingredientsList, measureList]);

  useEffect(() => {
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
  }, [history.location.pathname, setApiType]);

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
        if (history.location.pathname.includes('meals')) {
          const measures = arrays.filter((item) => item[1]); // esses ifs não precisam mais
          setMeasureList(measures);
        } if (history.location.pathname.includes('drinks')) {
          const measures = arrays.filter((item) => item[1]);
          setMeasureList(measures);
        }
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

  return (
    <div className="details-body">
      <h1>Recipe Details</h1>
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
      <StartRecipeButton />
    </div>
  );
}

export default RecipeDetails;
