import React, { useContext, useEffect } from 'react';
import './foods.css';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import AppContext from '../../context/AppContext';

function Meals() {
  const { apiData } = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    const verifyApiData = () => {
      if (apiData?.length === 1) {
        history.push(`/meals/${apiData[0].idMeal}`);
      }
    };
    verifyApiData();
  }, [apiData, history]);
  const limit = 12;
  return (
    <div className="foods-body">
      <Header title="Meals" />
      <div className="foods-container">
        {apiData?.slice(0, limit).map((meal, index) => (
          <Link
            className="foods-link"
            to={ `/meals/:${meal.idMeal}` }
            key={ index }
          >
            <div
              data-testid={ `${index}-recipe-card` }
              className="foods-board"
            >
              <img
                data-testid={ `${index}-card-img` }
                height="150"
                width="150"
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
