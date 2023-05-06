import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/header/Header';

function Profile() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.email) {
      setEmail(user.email);
    }
  }, []);

  return (
    <>
      <Header title="Profile" />
      <div>
        <p data-testid="profile-email">
          {email}
        </p>
        <button
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes

        </button>
        <button data-testid="profile-favorite-btn">Favorite Recipes</button>
        <button data-testid="profile-logout-btn">Logout</button>
      </div>
    </>
  );
}

export default Profile;
