import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import App from '../App';
import AppProvider from '../context/AppProvider';
import fetch from '../../cypress/mocks/fetch';
import oneDrink from '../../cypress/mocks/oneDrink';

describe('Testes component Drinks', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
  });
  it('testa filtros predefinidos de drinks estão presentes', async () => {
    // Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockUserData));
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/drinks');
  });
  it('testa botoes de filtro filtram os drinks corretamente', async () => {
    // Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockUserData));
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
      const imgGG = screen.getByRole('img', {
        name: /gg/i,
      });
      expect(imgGG).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(screen.getByTestId('Ordinary Drink-category-filter'));
    });

    await waitFor(() => {
      const img3M = screen.getByRole('img', {
        name: /3 mile long island iced tea/i,
      });
      expect(img3M).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(screen.getByTestId('Cocktail-category-filter'));
    });

    await waitFor(() => {
      const img155 = screen.getByRole('img', {
        name: /155 belmont/i,
      });
      expect(img155).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(screen.getByTestId('Shake-category-filter'));
    });

    await waitFor(() => {
      const img151 = screen.getByRole('img', {
        name: /151 florida bushwacker/i,
      });
      expect(img151).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(screen.getByTestId('Other / Unknown-category-filter'));
    });

    await waitFor(() => {
      const imgPiece = screen.getByRole('img', {
        name: /a piece of ass/i,
      });
      expect(imgPiece).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(screen.getByTestId('Cocoa-category-filter'));
    });

    await waitFor(() => {
      const imgCastillian = screen.getByRole('img', {
        name: /castillian hot chocolate/i,
      });
      expect(imgCastillian).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(screen.getByTestId('All-category-filter'));
    });

    await waitFor(() => {
      const imgGG = screen.getByRole('img', {
        name: /gg/i,
      });
      expect(imgGG).toBeInTheDocument();
    });
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
    history.push('/drinks');

    act(() => {
      userEvent.click(screen.getByRole('img', {
        name: /gg/i,
      }));
    });

    expect(history.location.pathname).toBe('/drinks/15997');
  });
  it('testa se tendo apenas um item já vai para a rota deste item', async () => {
    // Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockUserData));
    jest.clearAllMocks();
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneDrink),
    }));
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
      expect(history.location.pathname).toBe('/drinks/178319');
    });
  });
});
