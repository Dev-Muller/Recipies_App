import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/login/Login';

import Meals from './pages/Meals';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/profile/Profile';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/meals" component={ Meals } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/profile" component={ Profile } />
      </Switch>
    </div>
  );
}

export default App;
