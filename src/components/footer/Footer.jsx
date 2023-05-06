import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './footer.css';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="drinks">
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drikns-btn"
        />
      </Link>
      <Link to="/meals">
        <img
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          alt="meal-btn"
        />
      </Link>
    </footer>
  );
}

export default Footer;
