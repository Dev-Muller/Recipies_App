import React from 'react';
import PropTypes from 'prop-types';

function FilterButton({ innerText, categoryName, handleClick }) {
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
  handleClick: PropTypes.func.isRequired,
};

export default FilterButton;
