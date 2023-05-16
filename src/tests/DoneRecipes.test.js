import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Testa as funcionalidadea da página Done Recipes', () => {
  const setLocalStorage = (key, data) => {
    window.localStorage.setItem(key, JSON.stringify(data));
  };

  const renderWithRouter = (component, initialRoute = '/') => {
    const history = createMemoryHistory({ initialEntries: [initialRoute] });
    return ({
      ...render(<Router history={ history }>{component}</Router>), history,
    });
  };

  const recipes = [
    {
      alcoholicOrNot: '',
      nationality: 'Turkish',
      category: 'Side',
      doneDate: '2023-03-07T18:38:29.862Z',
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      name: 'Corba',
      tags: [
        'Soup',
      ],
      type: 'meal',
      id: '52977',
    },
    {
      alcoholicOrNot: '',
      nationality: 'Japanese',
      category: 'Seafood',
      doneDate: '2023-03-07T18:39:08.611Z',
      image: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
      name: 'Sushi',
      tags: [],
      type: 'meal',
      id: '53065',

    },
    {
      alcoholicOrNot: 'Alcoholic',
      nationality: '',
      category: 'Cocktail',
      doneDate: '2023-03-07T18:39:42.057Z',
      image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
      name: 'A1',
      tags: [],
      type: 'drink',
      id: '17222',
    },
  ];

  const route = '/done-recipes';
  const allIdBtn = 'filter-by-all-btn';
  const mealsIdBtn = 'filter-by-meal-btn';
  const drinksIdBtn = 'filter-by-drink-btn';
  setLocalStorage('doneRecipes', recipes);

  it('testa se há os botões de filtros em Tela', () => {
    renderWithRouter(<App />, route);
    const buttonAll = screen.getByTestId(allIdBtn);
    const buttonMeals = screen.getByTestId(mealsIdBtn);
    const buttonDrinks = screen.getByTestId(drinksIdBtn);
    expect(buttonAll).toBeInTheDocument();
    expect(buttonMeals).toBeInTheDocument();
    expect(buttonDrinks).toBeInTheDocument();
  });
  it('Testa se as as receitas salvas no local storage são renderizadas corretamente.', () => {
    renderWithRouter(<App />, route);
    const recipe1 = screen.getByText('Corba');
    const recipe2 = screen.getByText('Sushi');
    const recipe3 = screen.getByText('A1');
    expect(recipe1).toBeInTheDocument();
    expect(recipe2).toBeInTheDocument();
    expect(recipe3).toBeInTheDocument();
  });

  it('Testa o botão de filtro Meals.', () => {
    renderWithRouter(<App />, route);
    const recipe1 = screen.getByText('Corba');
    const recipe2 = screen.getByText('Sushi');
    const recipe3 = screen.getByText('A1');
    expect(recipe1).toBeInTheDocument();
    expect(recipe2).toBeInTheDocument();
    expect(recipe3).toBeInTheDocument();
    const buttonMeals = screen.getByTestId(mealsIdBtn);
    userEvent.click(buttonMeals);
    expect(recipe1).toBeInTheDocument();
    expect(recipe2).toBeInTheDocument();
    expect(recipe3).not.toBeInTheDocument();
  });

  it('Testa o botão de filtro Drinks.', () => {
    renderWithRouter(<App />, route);
    const recipe1 = screen.getByText('Corba');
    const recipe2 = screen.getByText('Sushi');
    const recipe3 = screen.getByText('A1');
    expect(recipe1).toBeInTheDocument();
    expect(recipe2).toBeInTheDocument();
    expect(recipe3).toBeInTheDocument();
    const buttonDrinks = screen.getByTestId(drinksIdBtn);
    userEvent.click(buttonDrinks);
    expect(recipe1).not.toBeInTheDocument();
    expect(recipe2).not.toBeInTheDocument();
    expect(recipe3).toBeInTheDocument();
  });

  it('Testa o botão de filtro All.', () => {
    renderWithRouter(<App />, route);
    const recipe1 = screen.getByText('Corba');
    const recipe2 = screen.getByText('Sushi');
    const recipe3 = screen.getByText('A1');
    expect(recipe1).toBeInTheDocument();
    expect(recipe2).toBeInTheDocument();
    expect(recipe3).toBeInTheDocument();
    const buttonAll = screen.getByTestId(allIdBtn);
    userEvent.click(buttonAll);
    expect(recipe1).toBeInTheDocument();
    expect(recipe2).toBeInTheDocument();
    expect(recipe3).toBeInTheDocument();
  });

  it('Testa se ao clicar em uma receita, é redirecionado para a tela de detalhes.', () => {
    renderWithRouter(<App />, route);
    const recipe1 = screen.getByText('Corba');
    expect(recipe1).toBeInTheDocument();
    userEvent.click(recipe1);
    const { pathname } = window.location;
    expect(pathname).toBe('/comidas/52977');
  });

  it('Testa se ao não clicar em nenhum filtro e clicar em uma receita, é redirecionado para a tela de detalhes.', () => {
    renderWithRouter(<App />, route);
    const recipe1 = screen.getByText('Corba');
    expect(recipe1).toBeInTheDocument();
    userEvent.click(recipe1);
    const { pathname } = window.location;
    expect(pathname).toBe('/comidas/52977');
  });

  it('Testa o botão de Compartilhar', () => {
    renderWithRouter(<App />, route);
    const recipe1 = screen.getByText('Corba');
    expect(recipe1).toBeInTheDocument();
    userEvent.click(recipe1);
    const shareBtn = screen.getByTestId('share-btn');
    userEvent.click(shareBtn);
    const link = screen.getByTestId('link');
    expect(link).toBeInTheDocument();
    expect(link.value).toBe('http://localhost:3000/comidas/52977');
  });

  it('Testa o botão de Favoritar', () => {
    renderWithRouter(<App />, route);
    const recipe1 = screen.getByText('Corba');
    expect(recipe1).toBeInTheDocument();
    userEvent.click(recipe1);
    const favoriteBtn = screen.getByTestId('favorite-btn');
    userEvent.click(favoriteBtn);
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipes).toEqual([{ id: '52977', type: 'comida', area: 'Turkish', category: 'Side', alcoholicOrNot: '', name: 'Corba', image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg' }]);
  });

  it('Testa se a mensagem "No recipes done" é exibida, caso não tenha receitas feitas', () => {
    renderWithRouter(<App />, route);
    const noRecipes = screen.getByText('No recipes done');
    expect(noRecipes).toBeInTheDocument();
  });
});
