import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import App from '../App';
import AppProvider from '../context/AppProvider';
import fetch from '../../cypress/mocks/fetch';

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

    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');

    expect(mealsBtn).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();
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

    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');

    const corbaImg = screen.getByRole('img', {
      name: /corba/i,
    });
    expect(corbaImg).toBeInTheDocument();

    act(() => {
      userEvent.click(drinksBtn);
    });

    const drinkGG = screen.getByRole('img', {
      name: /corba/i,
    });
    expect(drinkGG).toBeInTheDocument();

    act(() => {
      userEvent.click(mealsBtn);
    });
    expect(corbaImg).toBeInTheDocument();
  });
});
