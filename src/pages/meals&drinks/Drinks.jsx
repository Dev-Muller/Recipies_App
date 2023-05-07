import React, { useContext, useEffect } from 'react';
import './foods.css';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import AppContext from '../../context/AppContext';

function Drinks() {
  const { apiData } = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    const verifyApiData = () => {
      if (apiData?.length === 1) {
        history.push(`/drinks/${apiData[0].idDrink}`);
      }
    };
    verifyApiData();
  }, [apiData, history]);
  const limit = 12;
  return (
    <div className="foods-body">
      <Header title="Drinks" />
      <div className="foods-container">
        {apiData?.slice(0, limit).map((drink, index) => (
          <Link
            className="foods-link"
            to={ `/drinks/:${drink.idDrink}` }
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
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
              />
              <p
                className="foods-card-p"
                data-testid={ `${index}-card-name` }
              >
                {drink.strDrink}

              </p>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;
