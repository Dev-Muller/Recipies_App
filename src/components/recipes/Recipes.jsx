import React, { useContext, useEffect } from 'react';
import './recipes.css';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { fetchFullRecipe } from '../../services/fetchs_functions';

function Recipes({ data }) {
  const history = useHistory();
  const { apiType, isClicked, setApiType, setApiData } = useContext(AppContext);

  useEffect(() => {
    const runFetch = async () => {
      if (history.location.pathname === '/meals') {
        const resultA = await fetchFullRecipe('meals');
        setApiType('Meal');
        setApiData(resultA);
      }
      if (history.location.pathname === '/drinks') {
        const resultB = await fetchFullRecipe('drinks');
        setApiType('Drink');
        setApiData(resultB);
      }
    };
    runFetch();
  }, [history.location.pathname, setApiType, setApiData]);

  const limit = 12;

  return (
    <div className="foods-body">
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
                data-testid={ `${index}-card-img` }
                height="150"
                width="150"
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
