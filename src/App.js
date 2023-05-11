import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/login/Login';

import FavoriteRecipes from './pages/favoriteRecipes/FavoriteRecipes';
import DoneRecipes from './pages/doneRecipes/DoneRecipes';
import Drinks from './pages/meals&drinks/Drinks';
import Meals from './pages/meals&drinks/Meals';
import Profile from './pages/profile/Profile';
import RecipeDetails from './components/recipeDetails/RecipeDetails';
import RecipeInProgress from './components/recipeInProgress/RecipeInProgress';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/drinks/:idMeal" component={ RecipeDetails } />
        <Route exact path="/meals/:idDrink" component={ RecipeDetails } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route
          exact
          path="/meals/:idMeal/in-progress"
          component={ RecipeInProgress }
        />
        <Route
          exact
          path="/drinks/:idDrink/in-progress"
          component={ RecipeInProgress }
        />
      </Switch>
    </div>
  );
}

export default App;
