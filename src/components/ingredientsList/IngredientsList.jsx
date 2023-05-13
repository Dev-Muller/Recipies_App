import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { fetchById } from '../../services/fetchs_functions';
import './ingredientList.css';

function IngredientsList() {
  const history = useHistory();
  const [ingredientsAndMeasure, setIngredientsAndMeasure] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [measureList, setMeasureList] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [ingredientStored, setIngredientStored] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [checkedId, setCheckedId] = useState('');

  useEffect(() => {
    const runFetchId = async () => {
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

  const createInProgressObj = (target) => {
    const id = history.location.pathname.split('/')[2];
    const recipeInprogressStoreged = localStorage.getItem('inProgressRecipes');
    console.log(recipeInprogressStoreged);
    setIngredientStored((prevState) => (
      {
        ...prevState,
        drinks: { ...prevState.drinks, [id]: target.parentNode.children[1].innerHTML },
      }
    ));

    console.log(ingredientStored);
    // target.parentNode.children[1].innerHTML
    localStorage.setItem('inProgressRecipes', JSON.stringify(ingredientStored));
  };

  const handleChange = ({ target }) => {
    createInProgressObj(target);
  };

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
                  className={ isChecked ? 'item-checked' : 'item-unchecked' }
                >
                  <input
                    id={ ingredient[0] }
                    type="checkbox"
                    onChange={ (event) => handleChange(event) }
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
