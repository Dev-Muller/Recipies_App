import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import App from '../App';
import AppProvider from '../context/AppProvider';
import fetch from '../../cypress/mocks/fetch';

const mealRoute = '/meals/52844';
const startProgress = 'start-recipe-btn';
describe('Testes component Meals', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
  });
  it('testa se os components estão presentes na pagina de uma receita meal', async () => {
    // Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockUserData));
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push(mealRoute);

    await waitFor(() => {
      const ingredientes = screen.getByTestId('ingredients-List-container');
      expect(ingredientes).toBeInTheDocument();
    });
    const title = screen.getByRole('heading', {
      name: /recipe details/i,
    });
    const img = screen.getByTestId('recipe-photo');
    const recipeTitle = screen.getByTestId('recipe-title');
    const firstIngredient = screen.getByText(/stringredient1lentils 1 cup/i);
    const instruction = screen.getByTestId('instructions');
    const ytVideo = screen.getByTitle(/youtube video player/i);
    const recomendationCard0 = screen.getByTestId('0-recommendation-card');
    const recomendationCard1 = screen.getByTestId('1-recommendation-card');
    const recomendationCardImg0 = screen.getByTestId('0-card-img');
    const recomendationCardImg1 = screen.getByTestId('1-card-img');
    const startBtn = screen.getByTestId(startProgress);

    expect(title).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(firstIngredient).toBeInTheDocument();
    expect(instruction).toBeInTheDocument();
    expect(ytVideo).toBeInTheDocument();
    expect(recomendationCard0).toBeInTheDocument();
    expect(recomendationCard1).toBeInTheDocument();
    expect(recomendationCardImg0).toBeInTheDocument();
    expect(recomendationCardImg1).toBeInTheDocument();
    expect(startBtn).toBeInTheDocument();
  });
  it('testa se clicar em um item leva a pagina do item', async () => {
    // Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockUserData));
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push(mealRoute);

    act(() => {
      userEvent.click(screen.getByTestId(startProgress));
    });

    expect(history.location.pathname).toBe('/meals/52977/in-progress');
  });

  it('testa se os components estão presentes na pagina de uma receita drink', async () => {
    // Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockUserData));
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/drinks/15997');

    const title = screen.getByRole('heading', {
      name: /recipe details/i,
    });
    const img = screen.getByTestId('recipe-photo');
    const recipeTitle = screen.getByTestId('recipe-title');
    const firstIngredient = screen.getByText(/stringredient1galliano 2 1\/2 shots/i);
    const instruction = screen.getByTestId('instructions');
    const ytVideo = screen.getByTitle(/youtube video player/i);
    const recomendationCard0 = screen.getByTestId('0-recommendation-card');
    const recomendationCard1 = screen.getByTestId('1-recommendation-card');
    const recomendationCardImg0 = screen.getByTestId('0-card-img');
    const recomendationCardImg1 = screen.getByTestId('1-card-img');
    const startBtn = screen.getByTestId(startProgress);

    expect(title).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(firstIngredient).toBeInTheDocument();
    expect(instruction).toBeInTheDocument();
    expect(ytVideo).toBeInTheDocument();
    expect(recomendationCard0).toBeInTheDocument();
    expect(recomendationCard1).toBeInTheDocument();
    expect(recomendationCardImg0).toBeInTheDocument();
    expect(recomendationCardImg1).toBeInTheDocument();
    expect(startBtn).toBeInTheDocument();
  });
  it('testa se clicar em um item leva a pagina do item', async () => {
    // Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockUserData));
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/drinks/15997');

    act(() => {
      userEvent.click(screen.getByTestId(startProgress));
    });

    expect(history.location.pathname).toBe('/drinks/15997/in-progress');
  });
  it('testa se startRecipe', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push(mealRoute);

    act(() => {
      userEvent.click(screen.getByTestId(startProgress));
    });

    expect(history.location.pathname).toBe(mealRoute);
  });
});
