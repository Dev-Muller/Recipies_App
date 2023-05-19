import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';
import { drinks } from '../../cypress/mocks/drinks';
import { meals } from '../../cypress/mocks/meals';

describe('Testa as funcionalidadea da página Favorite Recipes', () => {
  const setLocalStorage = (key, data) => {
    window.localStorage.setItem(key, JSON.stringify(data));
  };

  const renderWithRouter = (component, initialRoute = '/') => {
    const history = createMemoryHistory({ initialEntries: [initialRoute] });
    return ({
      ...render(<Router history={ history }>{component}</Router>), history,
    });
  };

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve(
        meals,
        drinks,
      ),
    });
  });

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
  const route = '/favorite-recipes';
  const allIdBtn = 'filter-by-all-btn';
  const mealsIdBtn = 'filter-by-meal-btn';
  const drinksIdBtn = 'filter-by-drink-btn';

  const filterbtnSelected = 'filter-btn-selected';

  setLocalStorage('favoriteRecipes', recipes);

  it('Testa se os elementos da página são renderizados corretamente', async () => {
    renderWithRouter(<App />, route);

    const buttonAll = await screen.findByTestRole(allIdBtn);
    const buttonMeals = await screen.findByRole(mealsIdBtn);
    const buttonDrinks = await screen.findByRole(drinksIdBtn);

    expect(buttonAll).toBeInTheDocument();
    expect(buttonMeals).toBeInTheDocument();
    expect(buttonDrinks).toBeInTheDocument();

    await waitFor(() => {
      userEvent.click(buttonAll);
      expect(buttonAll).toHaveClass(filterbtnSelected);
      expect(buttonMeals).not.toHaveClass(filterbtnSelected);
      expect(buttonDrinks).not.toHaveClass(filterbtnSelected);
    });

    await waitFor(() => {
      userEvent.click(buttonMeals);
      expect(buttonAll).not.toHaveClass(filterbtnSelected);
      expect(buttonMeals).toHaveClass(filterbtnSelected);
      expect(buttonDrinks).not.toHaveClass(filterbtnSelected);
    });

    await waitFor(() => {
      userEvent.click(buttonDrinks);
      expect(buttonAll).not.toHaveClass(filterbtnSelected);
      expect(buttonMeals).not.toHaveClass(filterbtnSelected);
      expect(buttonDrinks).toHaveClass(filterbtnSelected);
    });
  });

  it('Testa se as as receitas salvas no local storage são renderizadas corretamente.', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));

    renderWithRouter(<App />, route);

    const recipe1 = screen.getByText('Corba');
    const recipe2 = screen.getByText('Sushi');
    const recipe3 = screen.getByText('A1');
    expect(recipe1).toBeInTheDocument();
    expect(recipe2).toBeInTheDocument();
    expect(recipe3).toBeInTheDocument();

    const buttonAll = screen.getByTestId(allIdBtn);
    const buttonMeals = screen.getByTestId(mealsIdBtn);
    const buttonDrinks = screen.getByTestId(drinksIdBtn);
    expect(buttonAll).toBeInTheDocument();
    expect(buttonMeals).toBeInTheDocument();
    expect(buttonDrinks).toBeInTheDocument();

    userEvent.click(buttonAll);
    expect(recipe1).toBeInTheDocument();
    expect(recipe2).toBeInTheDocument();

    userEvent.click(buttonMeals);
    expect(recipe1).toBeInTheDocument();
    expect(recipe2).toBeInTheDocument();
    expect(recipe3).not.toBeInTheDocument();

    userEvent.click(buttonDrinks);
    expect(recipe1).not.toBeInTheDocument();
    expect(recipe2).not.toBeInTheDocument();
    expect(recipe3).toBeInTheDocument();
  });

  it('Testa o botão de filtro Meals.', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
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

  it('Testa se ao clicar no botão de desfavoritar a receita é excluída do LocalStorage e o elemento não mais renderizado em tela.', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));

    renderWithRouter(<App />, route);
    const recipe1 = screen.getByText('Corba');
    const recipe2 = screen.getByText('Sushi');
    const recipe3 = screen.getByText('A1');

    expect(recipe1).toBeInTheDocument();
    expect(recipe2).toBeInTheDocument();
    expect(recipe3).toBeInTheDocument();

    await waitFor(() => recipes.forEach((recipe, index) => {
      if (recipe.name === 'Sushi') {
        const id = `${index}-horizontal-favorite-btn`;
        const unFavButton = screen.getByTestId(id);
        userEvent.click(unFavButton);
        expect(recipe2).not.toBeInTheDocument();
        const storedFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
        expect(storedFavoriteRecipes.length).toBe(2);
      }
    }));
  });

  it('Testa se é redirecionado ao apertar na imagem do drink', async () => {
    const history = createMemoryHistory();
    renderWithRouter(<App />, route);
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
    const drinkImg = await screen.findByTestId(testId0);

    act(() => {
      userEvent.click(drinkImg);
    });

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/drinks/178319');
    });
  });

  it('Testa se é redirecionado ao apertar no texto do drink', async () => {
    const history = createMemoryHistory();
    renderWithRouter(<App />, route);
    act(() => {
      userEvent.push(route);
    });

    const drinkText = await screen.findByTestId('0-horizontal-name');

    act(() => {
      userEvent.click(drinkText);
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/178332');
    });
  });

  it('Testa você é redirecionado ao apertar na imagem do meal', async () => {
    const history = createMemoryHistory();
    renderWithRouter(<App />, route);
    act(() => {
      userEvent.push(route);
    });

    const mealImg = await screen.findByTestId('0-horizontal-image');

    act(() => {
      userEvent.click(mealImg);
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52977');
    });
  });

  it('Testa é redirecionado ao apertar no texto do meal', async () => {
    const history = createMemoryHistory();
    renderWithRouter(<App />, route);
    act(() => {
      userEvent.push(route);
    });

    const mealText = await screen.findByTestId('1-horizontal-name');

    act(() => {
      userEvent.click(mealText);
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/53065');
    });
  });

  it('Testa o botão de favoritar', async () => {
    const history = createMemoryHistory();
    renderWithRouter(<App />, route);
    act(() => {
      userEvent.push(route);
    });

    const favoriteBtn = await screen.findByTestId('0-horizontal-favorite-btn');

    userEvent.click(favoriteBtn);

    await waitFor(() => {
      expect(screen.queryByRole('img', { name: /smashed watermelon margarita/i })).not.toBeInTheDocument();
      expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toStrictEqual([{
        id: '53065',
        type: 'meal',
        nationality: 'Japanese',
        category: 'Seafood',
        alcoholicOrNot: '',
        name: 'Sushi',
        image: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
      }]);

      expect(history.location.pathname).toBe('/favorite-recipes');

      expect(screen.getByRole('img', { name: /share/i })).toBeInTheDocument();

      expect(screen.getByRole('img', { name: /profile/i })).toBeInTheDocument();

      expect(screen.getByRole('img', { name: /search/i })).toBeInTheDocument();

      expect(screen.getByRole('heading', { name: /receitas favoritas/i })).toBeInTheDocument();

      expect(screen.getByRole('img', { name: /smashed watermelon margarita/i })).toBeInTheDocument();

      expect(screen.getByRole('img', { name: /favorite/i })).toBeInTheDocument();
    });
  });

  it('Testa o botão de compartilhar', async () => {
    const history = createMemoryHistory();
    renderWithRouter(<App />, route);
    act(() => {
      userEvent.push(route);
    });

    const shareBtn = await screen.findByTestId('0-horizontal-share-btn');

    userEvent.click(shareBtn);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/53065');
    });
  });
});
