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
      <div className="header-icons">
        <Header title="Profile" />
      </div>
      <div>
        <p data-testid="profile-email">
          {email}
        </p>
        <Link to="/done-recipes">
          <button data-testid="profile-done-btn">
            Done Recipes
          </button>
        </Link>

        <Link to="/favorite-recipes">
          <button data-testid="profile-favorite-btn">
            Favorite Recipes
          </button>
        </Link>

        <button data-testid="profile-logout-btn" onClick={ handleLogout }>
          Logout
        </button>
        <Footer />
      </div>
    </div>
  );
}

export default Profile;
