import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { fetchCategoriesList } from '../../services/fetchs_functions';

function FilterButton({ innerText, categoryName }) {
  const { setApiData,
    setIsFiltered,
    setApiCategory,
  } = useContext(AppContext);
  const history = useHistory();

  const runFilter = async () => {
    setApiCategory(categoryName);
    if (history.location.pathname === '/meals') {
      const result = await fetchCategoriesList('meals', categoryName);
      setApiData(result);
    }
    if (history.location.pathname === '/drinks') {
      const result = await fetchCategoriesList('drinks', categoryName);
      setApiData(result);
    }
  };

  const handleClick = () => {
    setIsFiltered(true);
    runFilter();
  };

  return (
    <button
      className="filter-button"
      data-testid={ `${categoryName}-category-filter` }
      onClick={ handleClick }
    >
      {innerText}
    </button>
  );
}

FilterButton.propTypes = {
  innerText: PropTypes.string.isRequired,
  categoryName: PropTypes.string.isRequired,
};

export default FilterButton;
