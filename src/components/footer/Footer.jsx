import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './footer.css';
import AppContext from '../../context/AppContext';

function Footer() {
  const { setIsFiltered } = useContext(AppContext);
  const handleClick = () => {
    setIsFiltered(false);
  };

  return (
    <footer data-testid="footer">
      <Link to="drinks">
        <button
          onClick={ handleClick }
        >
          <img
            className="drink-icon"
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            alt="drikns-btn"
          />
        </button>
      </Link>
      <Link to="/meals">
        <button
          onClick={ handleClick }
        >
          <img
            className="meal-icon"
            data-testid="meals-bottom-btn"
            src={ mealIcon }
            alt="meal-btn"
          />
        </button>
      </Link>
    </footer>
  );
}

export default Footer;
