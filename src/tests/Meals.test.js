import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import App from '../App';
import AppProvider from '../context/AppProvider';
import fetch from '../../cypress/mocks/fetch';
import oneMeal from '../../cypress/mocks/oneMeal';

describe('Testes component Meals', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
  });
  it('testa filtros predefinidos de meals estão presentes', async () => {
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
  });
  it('testa botoes de filtro beef e allCategories filtram os meals corretamente', async () => {
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
      expect(history.location.pathname).toBe('/meals');
    });

    await waitFor(() => {
      const imgCorba = screen.getByRole('img', {
        name: /corba/i,
      });
      expect(imgCorba).toBeInTheDocument();
    });

    userEvent.click(screen.getByTestId('Beef-category-filter'));

    await waitFor(() => {
      const imgBeef = screen.getByRole('img', {
        name: /beef and mustard pie/i,
      });
      expect(imgBeef).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(screen.getByTestId('All-category-filter'));
    });

    await waitFor(() => {
      const imgCorba = screen.getByRole('img', {
        name: /corba/i,
      });
      expect(imgCorba).toBeInTheDocument();
    });
  });
  it('testa botoes de filtro breakfeast filtra os meals corretamente', async () => {
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
      const imgCorba = screen.getByRole('img', {
        name: /corba/i,
      });
      expect(imgCorba).toBeInTheDocument();
    });

    userEvent.click(screen.getByTestId('Breakfast-category-filter'));

    await waitFor(() => {
      const imgBreakfast = screen.getByRole('img', {
        name: /breakfast potatoes/i,
      });
      expect(imgBreakfast).toBeInTheDocument();
    });
  });
  it('testa botoes de filtro chicken filtra os meals corretamente', async () => {
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
      const imgCorba = screen.getByRole('img', {
        name: /corba/i,
      });
      expect(imgCorba).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(screen.getByTestId('Chicken-category-filter'));
    });

    await waitFor(() => {
      const imgAyam = screen.getByRole('img', {
        name: /ayam percik/i,
      });
      expect(imgAyam).toBeInTheDocument();
    });
  });
  it('testa botoes de filtro dessert filtra os meals corretamente', async () => {
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

    act(() => {
      userEvent.click(screen.getByTestId('Dessert-category-filter'));
    });

    await waitFor(() => {
      const imgApam = screen.getByRole('img', {
        name: /apam balik/i,
      });
      expect(imgApam).toBeInTheDocument();
    });
  });

  it('testa botoes de filtro goat filtra os meals corretamente', async () => {
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
    act(() => {
      userEvent.click(screen.getByTestId('Goat-category-filter'));
    });
    await waitFor(() => {
      const imgMbuzi = screen.getByRole('img', {
        name: /mbuzi choma \(roasted goat\)/i,
      });
      expect(imgMbuzi).toBeInTheDocument();
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
    history.push('/meals');

    act(() => {
      userEvent.click(screen.getByTestId('0-card-img'));
    });

    expect(history.location.pathname).toBe('/meals/52977');
  });
  it('testa se tendo apenas um item já vai para a rota deste item', async () => {
    // Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockUserData));
    jest.clearAllMocks();
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(oneMeal),
    }));
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
      expect(history.location.pathname).toBe('/meals/52771');
    });
  });
  it('testa botoes de filtro beef e allCategories filtram os meals corretamente', async () => {
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
      expect(history.location.pathname).toBe('/meals');
    });

    await waitFor(() => {
      const imgCorba = screen.getByRole('img', {
        name: /corba/i,
      });
      expect(imgCorba).toBeInTheDocument();
    });

    userEvent.click(screen.getByTestId('Beef-category-filter'));

    await waitFor(() => {
      const imgBeef = screen.getByRole('img', {
        name: /beef and mustard pie/i,
      });
      expect(imgBeef).toBeInTheDocument();
    });

    userEvent.click(screen.getByTestId('Breakfast-category-filter'));

    await waitFor(() => {
      const imgBreakfast = screen.getByRole('img', {
        name: /breakfast potatoes/i,
      });
      expect(imgBreakfast).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(screen.getByTestId('Chicken-category-filter'));
    });

    await waitFor(() => {
      const imgAyam = screen.getByRole('img', {
        name: /ayam percik/i,
      });
      expect(imgAyam).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(screen.getByTestId('Dessert-category-filter'));
    });

    await waitFor(() => {
      const imgApam = screen.getByRole('img', {
        name: /apam balik/i,
      });
      expect(imgApam).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(screen.getByTestId('Goat-category-filter'));
    });

    await waitFor(() => {
      const imgMbuzi = screen.getByRole('img', {
        name: /mbuzi choma \(roasted goat\)/i,
      });
      expect(imgMbuzi).toBeInTheDocument();
    });

    act(() => {
      userEvent.click(screen.getByTestId('All-category-filter'));
    });

    await waitFor(() => {
      const imgCorba = screen.getByRole('img', {
        name: /corba/i,
      });
      expect(imgCorba).toBeInTheDocument();
    });
  });
});
