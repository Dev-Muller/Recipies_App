import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import RecipeDetails from '../pages/recipeDetails/RecipeDetails';
import App from '../App';

describe('Desenvolva os testes para a página RecipeDetails', () => {
  const recipeBtn = 'go-to-recipe-btn';

  test('Verifica se os detalhes da receita são renderizados corretamente', async () => {
    const recipe = {
      id: 1,
      strMeal: 'Pasta',
      strMealThumb: 'pasta.jpg',
      strCategory: 'Italian',
      strInstructions: 'Cook the pasta...',
    };

    render(
      <MemoryRouter>
        <RecipeDetails recipe={ [recipe] } />
      </MemoryRouter>,
    );

    const recipeTitle = screen.getByTestId('recipe-title');
    const recipeCategory = screen.getByTestId('recipe-category');
    const recipeInstructions = screen.getByTestId('instructions');

    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(recipeInstructions).toBeInTheDocument();

    expect(recipeTitle.textContent).toBe('Pasta');
    expect(recipeCategory.textContent).toBe('Italian');
    expect(recipeInstructions.textContent).toBe('Cook the pasta...');
  });

  test('Verifica o botão de compartilhar receita', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <RecipeDetails />
      </Router>,
    );

    const shareButton = screen.getByTestId('share-btn');
    fireEvent.click(shareButton);

    const linkCopiedMessage = screen.getByText('Link copied!');
    expect(linkCopiedMessage).toBeInTheDocument();
  });

  test('Verifica o botão de favoritar.', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <RecipeDetails />
      </Router>,
    );

    const favoriteButton = screen.getByTestId('favorite-btn');
    fireEvent.click(favoriteButton);

    const whiteHeartIcon = screen.getByAltText('btn');
    expect(whiteHeartIcon.src).toContain('blackHeartIcon.svg');
  });

  test('Verifica o botão de iniciar a receita', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <RecipeDetails />
      </Router>,
    );

    const startRecipeButton = screen.getByTestId('start-recipe-btn');
    fireEvent.click(startRecipeButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/comidas/52771/in-progress');
  });

  test('Verifica se vai para o botão da receita', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <RecipeDetails />
      </Router>,
    );

    const goToRecipeButton = screen.getByTestId(recipeBtn);
    fireEvent.click(goToRecipeButton);

    const { pathname } = history.location;
    expect(pathname).toBe(recipeBtn);
  });

  test('Verifica o botão de drinks', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <RecipeDetails />
      </Router>,
    );

    const goToRecipeButton = screen.getByTestId(recipeBtn);
    fireEvent.click(goToRecipeButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/comidas/52771');
  });

  it('Verifica se as receitas iniciadas são salvas  o localStorage "inProgressRecipes"', () => {
    const { getByTestId } = renderWithRouter(<App />, { route: '/comidas' });

    const checkbox = getByTestId('0-ingredient-step');
    fireEvent.click(checkbox);

    const recipe = {
      cocktails: {},
      meals: {
        52771: ['0-ingredient-step'],
      },
    };

    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    expect(inProgressRecipes).toEqual(recipe);
  });
});
