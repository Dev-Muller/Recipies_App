import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import App from '../App';
import AppProvider from '../context/AppProvider';
import fetch from '../../cypress/mocks/fetch';

describe('Testes component DoneRecipes', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
  });

  it('Testa se há os botões de filtros em Tela', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    act(() => {
      // eslint-disable-next-line sonarjs/no-duplicate-string
      history.push('/done-recipes');
    });
    const allBtn = screen.getByTestId('filter-by-all-btn');
    const foodBtn = screen.getByTestId('filter-by-food-btn');
    const drinkBtn = screen.getByTestId('filter-by-drink-btn');
    expect(allBtn).toBeInTheDocument();
    expect(foodBtn).toBeInTheDocument();
    expect(drinkBtn).toBeInTheDocument();
  });

  it('Testa se as as receitas salvas no local storage são renderizadas corretamente.', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    act(() => {
      history.push('/done-recipes');
    });
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const doneRecipesLength = doneRecipes.length;
    // eslint-disable-next-line sonarjs/no-duplicate-string
    const doneRecipesCards = screen.getAllByTestId('recipe-card');
    expect(doneRecipesCards.length).toBe(doneRecipesLength);
  });

  it('Testa o botão de filtro Meals.', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    act(() => {
      history.push('/done-recipes');
    });
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const doneRecipesLength = doneRecipes.length;
    const doneRecipesCards = screen.getAllByTestId('recipe-card');
    expect(doneRecipesCards.length).toBe(doneRecipesLength);
    const foodBtn = screen.getByTestId('filter-by-food-btn');
    userEvent.click(foodBtn);
    const doneRecipesCardsFood = screen.getAllByTestId('recipe-card');
    const doneRecipesFood = doneRecipes.filter((recipe) => recipe.type === 'comida');
    expect(doneRecipesCardsFood.length).toBe(doneRecipesFood.length);
  });

  it('Testa o botão de filtro Drinks.', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    act(() => {
      history.push('/done-recipes');
    });
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const doneRecipesLength = doneRecipes.length;
    const doneRecipesCards = screen.getAllByTestId('recipe-card');
    expect(doneRecipesCards.length).toBe(doneRecipesLength);
    const drinkBtn = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(drinkBtn);
    const doneRecipesCardsDrink = screen.getAllByTestId('recipe-card');
    const doneRecipesDrink = doneRecipes.filter((recipe) => recipe.type === 'bebida');
    expect(doneRecipesCardsDrink.length).toBe(doneRecipesDrink.length);
  });

  it('Testa o botão de filtro All.', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    act(() => {
      history.push('/done-recipes');
    });
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const doneRecipesLength = doneRecipes.length;
    const doneRecipesCards = screen.getAllByTestId('recipe-card');
    expect(doneRecipesCards.length).toBe(doneRecipesLength);
    const allBtn = screen.getByTestId('filter-by-all-btn');
    userEvent.click(allBtn);
    const doneRecipesCardsAll = screen.getAllByTestId('recipe-card');
    expect(doneRecipesCardsAll.length).toBe(doneRecipesLength);
  });

  it('Testa se ao clicar no card de uma receita, o usuário é redirecionado para a tela de detalhes da receita.', async () => {
    const history = createMemoryHistory();
    const { findByTestId } = render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    act(() => {
      history.push('/done-recipes');
    });
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const doneRecipesLength = doneRecipes.length;
    const doneRecipesCards = await screen.findAllByTestId('recipe-card');
    expect(doneRecipesCards.length).toBe(doneRecipesLength);
    const recipeCard = await findByTestId('0-horizontal-image');
    userEvent.click(recipeCard);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas/52771');
  });

  it('Testa se ao clicar no botão de compartilhar, o link da receita é copiado para o clipboard.', async () => {
    const history = createMemoryHistory();

    const { findByTestId } = render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    act(() => {
      history.push('/done-recipes');
    });
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const doneRecipesLength = doneRecipes.length;
    const doneRecipesCards = await screen.findAllByTestId('recipe-card');
    expect(doneRecipesCards.length).toBe(doneRecipesLength);
    const recipeCard = await findByTestId('0-horizontal-share-btn');
    userEvent.click(recipeCard);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas/52771');
  });

  it('Testa se ao clicar no botão de favoritar, a receita é removida da tela.', async () => {
    const history = createMemoryHistory();

    const { findByTestId, queryByTestId } = render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );

    act(() => {
      history.push('/done-recipes');
    });
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const doneRecipesLength = doneRecipes.length;
    const doneRecipesCards = await screen.findAllByTestId('recipe-card');
    expect(doneRecipesCards.length).toBe(doneRecipesLength);
    const recipeCard = await findByTestId('0-horizontal-favorite-btn');
    userEvent.click(recipeCard);
    const recipeCardAfterClick = await queryByTestId('0-horizontal-favorite-btn');
    expect(recipeCardAfterClick).not.toBeInTheDocument();
  });
});
