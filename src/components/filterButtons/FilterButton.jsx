import PropTypes from 'prop-types';
import React, { useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { fetchCategoriesList } from '../../services/fetchs_functions';
import './filterButton.css';

function FilterButton({ className, innerText, categoryName, action }) {
  const {
    setApiData,
    setApiCategory,
  } = useContext(AppContext);
  const history = useHistory();

  const runFilter = useCallback(async () => {
    setApiCategory(categoryName);
    if (history.location.pathname === '/meals') {
      const result = await fetchCategoriesList('meals', categoryName);
      setApiData(result);
    }
    if (history.location.pathname === '/drinks') {
      const result = await fetchCategoriesList('drinks', categoryName);
      setApiData(result);
    }
  }, [categoryName, history.location.pathname, setApiCategory, setApiData]);

  const handleClick = (target) => {
    action(target);
    runFilter();
  };

  return (
    <button
      className={ className }
      data-testid={ `${categoryName}-category-filter` }
      onClick={ ({ target }) => handleClick(target) }
    >
      {innerText}
    </button>
  );
}

FilterButton.propTypes = {
  className: PropTypes.string.isRequired,
  innerText: PropTypes.string.isRequired,
  categoryName: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

export default FilterButton;
