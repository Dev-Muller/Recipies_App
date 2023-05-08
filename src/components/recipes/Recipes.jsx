import React, { useContext, useEffect, useState } from 'react';
import './recipes.css';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { fetchCategories, fetchFullRecipe } from '../../services/fetchs_functions';
import FilterButton from '../filterButtons/FilterButton';

function Recipes({ data }) {
  const [categories, setCategories] = useState([]);
  const history = useHistory();
  const { apiType, isClicked, setApiType, setApiData } = useContext(AppContext);

  useEffect(() => {
    const runFetch = async () => {
      if (history.location.pathname === '/meals') {
        const resultRecipe = await fetchFullRecipe('meals');
        const resultCat = await fetchCategories('meals');
        setApiType('Meal');
        setApiData(resultRecipe);
        setCategories(resultCat);
      }
      if (history.location.pathname === '/drinks') {
        const resultRecipe = await fetchFullRecipe('drinks');
        const resultCat = await fetchCategories('drinks');
        setApiType('Drink');
        setApiData(resultRecipe);
        setCategories(resultCat);
      }
    };
    runFetch();
  }, [history.location.pathname, setApiType, setApiData]);

  const handleClick = () => {
    console.log('clicou no filtro');
  };

  const limit = 12;
  const catLimit = 5;

  return (
    <div className="foods-body">
      <div className="foods-filters">
        {categories.slice(0, catLimit).map((category, index) => (
          <FilterButton
            key={ index }
            innerText={ category.strCategory }
            categoryName={ category.strCategory }
            handleClick={ handleClick }
          />
        ))}
      </div>
      <div className="foods-container">
        {!isClicked && data?.slice(0, limit).map((recipe, index) => (
          <Link
            className="foods-link"
            to="/"
            key={ index }
          >
            <div
              className="foods-board"
              data-testid={ `${index}-recipe-card` }
            >
              <img
                className="foods-img"
                data-testid={ `${index}-card-img` }
                height="120"
                width="120"
                src={ recipe[`str${apiType}Thumb`] }
                alt={ recipe[`str${apiType}`] }
              />
              <p
                className="foods-card-p"
                data-testid={ `${index}-card-name` }
              >
                {recipe[`str${apiType}`]}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

Recipes.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Recipes;
