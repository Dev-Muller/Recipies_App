import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { fetchById } from '../../services/fetchs_functions';

function IngredientsList() {
  const history = useHistory();
  const [ingredientsAndMeasure, setIngredientsAndMeasure] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [measureList, setMeasureList] = useState([]);
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    const type = history.location.pathname.split('/')[1];
    const runFetchId = async () => {
      const id = history.location.pathname.split('/')[2];
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
        if (history.location.pathname.includes('drink')) {
          const measures = arrays.filter((item) => item[1]);
          setMeasureList(measures);
        }
        if (history.location.pathname.includes('meals')) {
          const measures = arrays.filter((item) => item[1]); // adicionar o [1] após conclusão do projeto
          setMeasureList(measures);
        }
      }
    };
    createMeasures();
    createIngredients();
  }, [recipe, history.location.pathname]);

  useEffect(() => {
    if (ingredientsList.length && measureList.length) {
      const newIngredientsAndMeasure = measureList
        .map((measure, index) => [ingredientsList[index], measure[1]]); // adicionar [1] no ingredientList após a conclusão do projeto
      setIngredientsAndMeasure(newIngredientsAndMeasure);
    }
  }, [ingredientsList, measureList]);

  return (
    <div>
      <h1>ingredients</h1>
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
    </div>
  );
}

export default IngredientsList;
