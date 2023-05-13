import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { fetchById } from '../../services/fetchs_functions';
import './ingredientList.css';

function IngredientsList() {
  const history = useHistory();
  const [ingredientsAndMeasure, setIngredientsAndMeasure] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [measureList, setMeasureList] = useState([]);
  const [recipe, setRecipe] = useState([]);

  const createIngredientSaved = () => {
    const id = history.location.pathname.split('/')[2];
    const type = history.location.pathname.split('/')[1];
    if (history.location.pathname.includes('in-progress')) {
      if (!JSON.parse(localStorage.getItem('inProgressRecipes'))[type][id].length > 0) {
        return [];
      }
      return JSON.parse(localStorage.getItem('inProgressRecipes'))[type][id];
    }
  };

  const [ingredientSaved, setIngredientSaved] = useState(createIngredientSaved());
  console.log(ingredientSaved);

  useEffect(() => {
    if (!JSON.parse(localStorage.getIem('inProgressRecipe'))) {
      localStorage
        .setItem('inProgressRecipes', JSON.stringify({ meals: {}, drinks: {} }));
    }
  }, []);

  useEffect(() => {
    const runFetchId = async () => {
      const id = history.location.pathname.split('/')[2];
      const type = history.location.pathname.split('/')[1];
      const result = await fetchById(type, id);
      setRecipe(result);
    };
    runFetchId();
  }, [history.location.pathname]);

  useEffect(() => {
    const createIngredients = () => {
      if (recipe.length) {
        const object = recipe.map((arrays) => arrays);
        const arrays = Object.entries(object[0]).filter((item) => (
          item[0].startsWith('strIngredient')
        ));
        const ingredients = arrays.map((item) => item[1])
          .filter((e) => e !== '').filter((i) => i !== null);
        setIngredientsList(ingredients);
      }
    };
    const createMeasures = () => {
      if (recipe.length) {
        const object = recipe.map((arrays) => arrays);
        const arrays = Object.entries(object[0]).filter((item) => (
          item[0].startsWith('strMeasure')
        ));
        const measures = arrays.map((item) => item[1])
          .filter((e) => e !== ' ').filter((i) => i !== null);
        setMeasureList(measures);
      }
    };
    createMeasures();
    createIngredients();
  }, [recipe, history.location.pathname]);

  useEffect(() => {
    if (ingredientsList.length && measureList.length) {
      const newIngredientsAndMeasure = ingredientsList
        .map((measure, index) => [measure, measureList[index]]);
      setIngredientsAndMeasure(newIngredientsAndMeasure);
    }
  }, [ingredientsList, measureList]);

  const createInProgressObj = useCallback((target) => {
    const targetValue = target.parentNode.children[1].innerHTML;
    const targetIngredient = targetValue.split(' -')[0];
    setIngredientSaved((prevState) => [...prevState, targetIngredient]);
  }, []);

  const handleChange = ({ target }) => {
    createInProgressObj(target);
    const targetValue = target.parentNode.children[1].innerHTML;
    const targetIngredient = targetValue.split(' -')[0];
    if (ingredientSaved.includes(targetIngredient)) {
      const newIngredientesSaved = ingredientSaved.filter((e) => e !== targetIngredient);
      setIngredientSaved(newIngredientesSaved);
    }
  };

  useEffect(() => {
    const id = history.location.pathname.split('/')[2];
    const type = history.location.pathname.split('/')[1];
    if (history.location.pathname.includes('in-progress')) {
      const recoverLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const newObj = {
        ...recoverLocalStorage,
        [type]: {
          ...recoverLocalStorage[type],
          [id]: ingredientSaved,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newObj));
    }
  }, [ingredientSaved, history.location.pathname]);

  return (
    <div>
      <h1>ingredients</h1>
      <ul>
        {ingredientsAndMeasure?.map((ingredient, ingredientsIndex) => (
          <li
            data-testid={ `${ingredientsIndex}-ingredient-name-and-measure` }
            key={ ingredientsIndex }
          >
            {history.location.pathname.includes('/in-progress') ? (
              <div>
                <label
                  htmlFor={ ingredient[0] }
                  data-testid={ `${ingredientsIndex}-ingredient-step` }
                  className={ ingredientSaved?.includes(ingredient[0])
                    ? 'item-checked' : 'item-unchecked' }
                >
                  <input
                    id={ ingredient[0] }
                    type="checkbox"
                    onChange={ (event) => handleChange(event) }
                    checked={ ingredientSaved?.includes(ingredient[0]) }
                  />
                  <p>
                    {ingredient[0]}
                    {' '}
                    -
                    {' '}
                    {ingredient[1]}
                  </p>
                </label>
              </div>
            ) : (
              <p>
                {ingredient[0]}
                {' '}
                -
                {' '}
                {ingredient[1]}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IngredientsList;
