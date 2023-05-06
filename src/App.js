import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import AppProvider from './context/AppProvider';
import Login from './pages/Login';
import Meals from './pages/Meals';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';

function App() {
  return (
    <div>
      <AppProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/meals" component={ Meals } />
            <Route exact path="/done-recipes" component={ DoneRecipes } />
            <Route exact path="/drinks" component={ Drinks } />
            <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
            <Route exact path="/profile" component={ Profile } />
          </Switch>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
