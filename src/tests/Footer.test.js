import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import App from '../App';
import AppProvider from '../context/AppProvider';
import fetch from '../../cypress/mocks/fetch';

const mealId = 'meals-bottom-btn';
const drinkId = 'drinks-bottom-btn';
describe('Testes component footer', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
  });
  it('testa botoes que levam a meals e drinks estão presentes no footer', async () => {
    // Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockUserData));
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/meals');

    await waitFor(() => {
      const mealsBtn = screen.getByTestId(mealId);
      const drinksBtn = screen.getByTestId(drinkId);
      expect(mealsBtn).toBeInTheDocument();
      expect(drinksBtn).toBeInTheDocument();
    });
  });
  it('testa botoes que levam meals para drinks', async () => {
    // Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockUserData));
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/meals');

    await waitFor(() => {
      const corbaImg = screen.getByRole('img', {
        name: /corba/i,
      });
      expect(corbaImg).toBeInTheDocument();
    });

    const drinksBtn = screen.getByTestId(drinkId);

    act(() => {
      userEvent.click(drinksBtn);
    });

    await waitFor(() => {
      const drinkGG = screen.getByRole('img', {
        name: /gg/i,
      });
      expect(drinkGG).toBeInTheDocument();
    });
  });
  it('testa botoes que levam drinks para meals', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/drinks');

    await waitFor(() => {
      const drinkGG = screen.getByRole('img', {
        name: /gg/i,
      });
      expect(drinkGG).toBeInTheDocument();
    });

    act(() => {
      const mealsBtn = screen.getByTestId(mealId);
      userEvent.click(mealsBtn);
    });

    await waitFor(() => {
      // const corbaImg = screen.getByRole('img', {
      //   name: /corba/i,
      // });
      expect(history.location.pathname).toBe('/meals');
    }, { timeout: 3000 });
    screen.debug();
  });
  it('testa botao que leva a drinks nao tem filtro', async () => {
    // Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockUserData));
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/meals');

    await waitFor(() => {
      const corbaImg = screen.getByRole('img', {
        name: /corba/i,
      });
      expect(corbaImg).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(screen.getByTestId('Chicken-category-filter'));
    });

    await waitFor(() => {
      const imgChicken = screen.getByRole('img', {
        name: /brown stew chicken/i,
      });
      expect(imgChicken).toBeInTheDocument();
    });

    const drinksBtn = screen.getByTestId(drinkId);
    act(() => {
      userEvent.click(drinksBtn);
    });

    await waitFor(() => {
      const drinkGG = screen.getByRole('img', {
        name: /gg/i,
      });
      expect(drinkGG).toBeInTheDocument();
    });

    const mealsBtn = screen.getByTestId(mealId);
    act(() => {
      userEvent.click(mealsBtn);
    });

    await waitFor(() => {
      const corbaImg = screen.getByRole('img', {
        name: /corba/i,
      });
      expect(corbaImg).toBeInTheDocument();
    });
  });
});
