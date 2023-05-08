import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import './profile.css';

function Profile() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.email) {
      setEmail(user.email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="profile-body">
      <Header title="Profile" />
      <div className="profile-container">
        <p
          className="profile-email"
          data-testid="profile-email"
        >
          {email}
        </p>
        <div className="profile-buttons">
          <Link to="/done-recipes">
            <button
              className="profile-button"
              data-testid="profile-done-btn"
            >
              Done Recipes
            </button>
          </Link>

          <Link to="/favorite-recipes">
            <button
              className="profile-button"
              data-testid="profile-favorite-btn"
            >

              Favorite Recipes
            </button>
          </Link>

          <button
            className="profile-button"
            data-testid="profile-logout-btn"
            onClick={ handleLogout }
          >
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
