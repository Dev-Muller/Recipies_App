import React, { useContext, useEffect } from 'react';
import './foods.css';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import AppContext from '../../context/AppContext';
import Recipes from '../../components/recipes/Recipes';

function Meals() {
  const { isClicked, isFiltered, setIsClicked, apiData } = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      localStorage
        .setItem('inProgressRecipes', JSON.stringify({ meals: {}, drinks: {} }));
    }
  }, []);

  useEffect(() => {
    setIsClicked(false);
  });

  useEffect(() => {
    const verifyApiData = () => {
      if (apiData?.length === 1 && !isFiltered) {
        history.push(`/meals/${apiData[0].idMeal}`);
      }
    };
    verifyApiData();
  }, [apiData, history, isFiltered]);

  const limit = 12;

  return (
    <div className="foods-body">
      <Header title="Meals" />
      <Recipes data={ apiData } />
      <div className={ !isClicked ? 'foods-container-off' : 'foods-container' }>
        {isClicked && apiData?.slice(0, limit).map((meal, index) => (
          <Link
            className="foods-link"
            to={ `/meals/:${meal.idMeal}` }
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
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
              />
              <p
                className="foods-card-p"
                data-testid={ `${index}-card-name` }
              >
                {meal.strMeal}

              </p>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Meals;
