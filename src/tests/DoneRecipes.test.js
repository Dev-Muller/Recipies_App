import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';
import DoneRecipes from '../pages/doneRecipes/DoneRecipes';

describe('Testa as funcionalidadea da página Done Recipes', () => {
  const date = '07/03/2023';

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

  it('testa se há os botões de filtros em Tela e a rota é done-recipes', () => {
    renderWithRouter(<App />, route);
    const buttonAll = screen.getByTestId(allIdBtn);
    const buttonMeals = screen.getByTestId(mealsIdBtn);
    const buttonDrinks = screen.getByTestId(drinksIdBtn);
    expect(buttonAll).toBeInTheDocument();
    expect(buttonMeals).toBeInTheDocument();
    expect(buttonDrinks).toBeInTheDocument();

    const { history } = renderWithRouter(<DoneRecipes />);
    expect(history.location.pathname).toBe(route);
  });

  it('Testa se as as receitas salvas no local storage são renderizadas corretamente.', () => {
    renderWithRouter(<App />, route);
    const recipe1 = screen.getByText('Corba');
    const recipe2 = screen.getByText('Sushi');
    const recipe3 = screen.getByText('A1');
    expect(recipe1).toBeInTheDocument();
    expect(recipe2).toBeInTheDocument();
    expect(recipe3).toBeInTheDocument();

    const recipe1Img = screen.getByAltText('Corba');
    const recipe2Img = screen.getByAltText('Sushi');
    const recipe3Img = screen.getByAltText('A1');
    expect(recipe1Img).toBeInTheDocument();
    expect(recipe2Img).toBeInTheDocument();
    expect(recipe3Img).toBeInTheDocument();

    const recipe1Category = screen.getByText('Side');
    const recipe2Category = screen.getByText('Seafood');
    const recipe3Category = screen.getByText('Cocktail');
    expect(recipe1Category).toBeInTheDocument();
    expect(recipe2Category).toBeInTheDocument();
    expect(recipe3Category).toBeInTheDocument();

    const recipe1Date = screen.getByText(date);
    const recipe2Date = screen.getByText(date);
    const recipe3Date = screen.getByText(date);
    expect(recipe1Date).toBeInTheDocument();
    expect(recipe2Date).toBeInTheDocument();
    expect(recipe3Date).toBeInTheDocument();

    const recipe1Tags = screen.getByText('Soup');
    expect(recipe1Tags).toBeInTheDocument();

    const recipe2Tags = screen.queryByText('Soup');
    expect(recipe2Tags).not.toBeInTheDocument();

    const recipe3Tags = screen.queryByText('Soup');
    expect(recipe3Tags).not.toBeInTheDocument();
  });

  it('renderiza meal resgatado do localStorage', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(recipes));
    renderWithRouter(<App />, route);
    const recipe1 = screen.getByText('Corba');
    expect(recipe1).toBeInTheDocument();
    const recipe1Img = screen.getByAltText('Corba');
    expect(recipe1Img).toBeInTheDocument();
    const recipe1Category = screen.getByText('Side');
    expect(recipe1Category).toBeInTheDocument();
    const recipe1Date = screen.getByText(date);
    expect(recipe1Date).toBeInTheDocument();
    const recipe1Tags = screen.getByText('Soup');
    expect(recipe1Tags).toBeInTheDocument();
  });

  it('renderiza drink resgatado do localStorage', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(recipes));
    renderWithRouter(<App />, route);
    const recipe3 = screen.getByText('A1');
    expect(recipe3).toBeInTheDocument();
    const recipe3Img = screen.getByAltText('A1');
    expect(recipe3Img).toBeInTheDocument();
    const recipe3Category = screen.getByText('Cocktail');
    expect(recipe3Category).toBeInTheDocument();
    const recipe3Date = screen.getByText(date);
    expect(recipe3Date).toBeInTheDocument();
    const recipe3Tags = screen.queryByText('Soup');
    expect(recipe3Tags).not.toBeInTheDocument();
  });

  it('Testa o botão de filtro Meals.', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(recipes));
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

    const recipe2 = screen.getByText('Sushi');
    expect(recipe2).toBeInTheDocument();
    userEvent.click(recipe2);
    expect(pathname).toBe('/comidas/52771');

    const recipe3 = screen.getByText('A1');
    expect(recipe3).toBeInTheDocument();
    userEvent.click(recipe3);
    expect(pathname).toBe('/bebidas/178319');
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

  it('Verifica se ao clicar no botão de compartilhar é renderizada uma confirmação da cópia na página', () => {
    const linkCopied = 'Link copied!';
    const horizontalName = '0-horizontal-name';
    const share = '0-horizontal-share-btn';

    localStorage.setItem('doneRecipes', JSON.stringify(recipes));
    renderWithRouter(<App />, route);
    expect(screen.getByTestId(horizontalName)).toBeInTheDocument();
    const mockedClipboard = jest.fn();
    navigator.clipboard = {
      writeText: mockedClipboard,
    };
    const shareBtn = screen.getByTestId(share);
    expect(shareBtn).toBeInTheDocument();
    expect(screen.queryByText(linkCopied)).not.toBeInTheDocument();
    userEvent.click(shareBtn);
    expect(mockedClipboard).toHaveBeenCalledTimes(1);
    expect(screen.getByText(linkCopied)).toBeInTheDocument();
  });

  it('verifica o retorno inválido do localStorage', () => {
    const horizontal = '0-horizontal-name';
    const hImg = '0-horizontal-image';
    const hTop = '0-horizontal-top-text';
    const hDone = '0-horizontal-done-date';
    const share = '0-horizontal-share-btn';
    const invalidRecipe = 'invalidRecipe';

    localStorage.setItem('doneRecipes', invalidRecipe);
    renderWithRouter(<App />, route);

    expect(screen.queryByTestId(horizontal)).toBeNull();
    expect(screen.queryByTestId(hImg)).toBeNull();
    expect(screen.queryByTestId(hTop)).toBeNull();
    expect(screen.queryByTestId(hDone)).toBeNull();
    expect(screen.queryByTestId(share)).toBeNull();

    localStorage.setItem('doneRecipes', JSON.stringify([]));
    renderWithRouter(<App />, route);

    expect(screen.queryByTestId(horizontal)).toBeNull();
    expect(screen.queryByTestId(hImg)).toBeNull();
    expect(screen.queryByTestId(hTop)).toBeNull();
    expect(screen.queryByTestId(hDone)).toBeNull();
    expect(screen.queryByTestId(share)).toBeNull();

    localStorage.setItem('doneRecipes', JSON.stringify([{}]));
    renderWithRouter(<App />, route);

    expect(screen.queryByTestId(horizontal)).toBeNull();
    expect(screen.queryByTestId(hImg)).toBeNull();
    expect(screen.queryByTestId(hTop)).toBeNull();
    expect(screen.queryByTestId(hDone)).toBeNull();
    expect(screen.queryByTestId(share)).toBeNull();
  });

  it('Verifica se compartilha o link ao clicar no botão de compartilhamento', () => {
    const mockedClipboard = jest.fn();
    const recipeId = 8823;
    const recipeType = 'drink';
    const recipe = {
      id: recipeId,
      type: recipeType,
      nationality: 'russian',
      category: 'soup',
      alcoholicOrNot: '',
      name: 'vodka',
      image: image1,
      doneDate: '21/02/23',
      tags: [],
    };
    localStorage.setItem('doneRecipes', JSON.stringify([recipe]));
    renderWithRouter(<App />, route);

    navigator.clipboard = {
      writeText: mockedClipboard,
    };
    const shareBtn = screen.getByTestId(share);
    userEvent.click(shareBtn);
    expect(mockedClipboard).toHaveBeenCalledTimes(1);
    expect(mockedClipboard).toHaveBeenCalledWith(`http://localhost:3000/${recipeType}s/${recipeId}`);
  });
});
