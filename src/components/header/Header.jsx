import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './header.css';
import { Link } from 'react-router-dom';
import ComponentImage from '../componentImage/ComponentImage';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from '../searchBar/SearchBar';

function Header({ title }) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleClickSearch = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  return (
    <header>
      <div className="header-buttons">
        {(title === 'Meals' || title === 'Drinks') ? (
          <div className="header-icons">
            <button
              onClick={ handleClickSearch }
              className="search-button"
            >
              <ComponentImage
                icon={ searchIcon }
                alt="search-icon"
                testId="search-top-btn"
              />
            </button>
            <Link to="/profile">
              <ComponentImage
                icon={ profileIcon }
                alt="profile-icon"
                testId="profile-top-btn"
              />
            </Link>
          </div>
        ) : (
          <div className="header-icons">
            <Link to="/profile">
              <ComponentImage
                icon={ profileIcon }
                alt="profile-icon"
                testId="profile-top-btn"
              />
            </Link>
          </div>
        )}
      </div>
      <h1 data-testid="page-title">
        { title }
      </h1>
      {isOpenMenu && <SearchBar />}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
