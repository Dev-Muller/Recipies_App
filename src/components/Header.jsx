import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title }) {
  return (
    <header>
      <h1 data-testid="page-title">
        { title }
      </h1>
      <button
        data-testid="profile-top-btn"
        type="button"
      >
        <img
          src={ profileIcon }
          alt="profileIcon"
          data-testid="profile-icon"
        />
      </button>

      <button
        type="button"
        data-testid="search-top-btn"
      >
        <img
          src={ searchIcon }
          alt="searchIcon"
          data-testid="search-top-btn"
        />
      </button>

    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
