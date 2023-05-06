import React from 'react';

function SearchButton({ testId, innerText, handleClick }) {
  return (
    <button
      data-testid={ testId }
      onClick={ handleClick }
    >
      {innerText}
    </button>
  );
}

SearchButton.propTypes = {
  testId: PropTypes.string.isRequired,
  innerText: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
export default SearchButton;
