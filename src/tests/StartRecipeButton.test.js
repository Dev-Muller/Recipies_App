/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
// import StartRecipeButton from '../components/startRecipeButton/StartRecipeButton';
import App from '../App';

describe('StartRecipeButton', () => {
  const renderWithRouter = (component, initialRoute = '/') => {
    const history = createMemoryHistory({ initialEntries: [initialRoute] });
    return ({
      ...render(<Router history={ history }>{component}</Router>), history,
    });
  };

  it('Verifica se o botão está renderizado corretamente', () => {
    renderWithRouter(<App />);

    const startButton = screen.getByRole('button', { name: 'Start Recipe' });
    expect(startButton).toBeInTheDocument();
  });

  it('Simula uma rota que indica uma receita em progresso e Verifica se o botão exibe corretamente o texto "Continue Recipe"', () => {
    jest.spyOn(window.history, 'location', 'get').mockReturnValueOnce({
      pathname: '/meals/123/in-progress',
    });

    renderWithRouter(<App />);

    const continueButton = screen.getByText('Continue Recipe');
    expect(continueButton).toBeInTheDocument();
  });

  it('Simula uma rota que indica uma receita em progresso e Verifica se o botão exibe corretamente o texto "Finish Recipe"', () => {
    jest.spyOn(window.history, 'location', 'get').mockReturnValueOnce({
      pathname: '/meals/123/in-progress',
    });

    renderWithRouter(<App />);

    const finishButton = screen.getByText('Finish Recipe');
    expect(finishButton).toBeInTheDocument();
  });

  it('Simula uma rota que não indica uma receita em progresso e Verifica se o botão exibe corretamente o texto "Start Recipe"', () => {
    jest.spyOn(window.history, 'location', 'get').mockReturnValueOnce({
      pathname: '/meals/123',
    });

    renderWithRouter(<App />);

    const startButton = screen.getByText('Start Recipe');
    expect(startButton).toBeInTheDocument();
  });

  it('Simula uma rota que não indica uma receita em progresso ', () => {
    jest.spyOn(window.history, 'location', 'get').mockReturnValueOnce({
      pathname: '/meals/123',
    });

    const getStoredStartedMock = jest.fn();

    renderWithRouter(<App />);

    const startButton = screen.getByText('Start Recipe');

    fireEvent.click(startButton);

    expect(getStoredStartedMock).toHaveBeenCalled();
  });
});
