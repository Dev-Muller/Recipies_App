import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/header.css';
import ComponentImage from '../componentImage/ComponentImage';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header({ title }) {
  return (
    <header>
      <h1 data-testid="page-title">
        { title }
      </h1>
      {(title === 'Meals' || title === 'Drinks') ? (
        <div>
          <ComponentImage
            icon={ profileIcon }
            alt="profile-icon"
            testId="profile-top-btn"
          />
          <ComponentImage
            icon={ searchIcon }
            alt="search-icon"
            testId="search-top-btn"
          />
        </div>
      ) : (
        <ComponentImage
          icon={ profileIcon }
          alt="profile-icon"
          testId="profile-top-btn"
        />
      )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
