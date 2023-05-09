import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import App from '../App';
import AppProvider from '../context/AppProvider';
import { drinks } from '../../cypress/mocks/drinks';
import { meals } from '../../cypress/mocks/meals';
import { mockUserData } from './mocks/userMock';

const profilePictureId = 'profile-top-btn';
const emailId = 'profile-email';
const pageTitleId = 'page-title';
describe('Testes component Profile', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve(
        meals,
        drinks,
      ),
    });
  });
  it('testa se botao de profile, botao de receitar prontas, favoritas ou botao de logout e email do usuario estão presentes', async () => {
    // Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockUserData));
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/profile');

    const profilePicture = await screen.findByTestId(profilePictureId);
    const emailTop = await screen.findByTestId(emailId);
    const pageTitle = await screen.findByTestId(pageTitleId);
    const logout = await screen.queryByTestId('profile-logout-btn');
    const favorites = await screen.findByTestId('profile-favorite-btn');
    const done = await screen.findByTestId('profile-done-btn');

    expect(profilePicture).toBeInTheDocument();
    expect(emailTop).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(logout).toBeInTheDocument();
    expect(favorites).toBeInTheDocument();
    expect(done).toBeInTheDocument();
  });
  it('testa se ao clicar no botao de done recepies leva a rota de receitas prontas', async () => {
    // Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockUserData));
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/profile');

    const done = await screen.findByTestId('profile-done-btn');

    act(() => {
      userEvent.click(done);
    });

    expect(history.location.pathname).toBe('/done-recipes');
  });
  it('testa se ao clicar no botao de favorites recepies leva a rota de receitas favoritas', async () => {
    // Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockUserData));
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/profile');

    const done = await screen.findByTestId('profile-favorite-btn');

    act(() => {
      userEvent.click(done);
    });

    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  it('testa se ao clicar no botao de logout leva a rota home', async () => {
    localStorage.setItem('user', JSON.stringify(mockUserData));
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    const teste = localStorage.getItem('user');

    history.push('/profile');

    const text = await screen.findByText('email@email.com');
    expect(text).toBeInTheDocument();

    expect(JSON.parse(teste).email).toBe('email@email.com');

    const done = await screen.findByTestId('profile-logout-btn');

    act(() => {
      userEvent.click(done);
    });

    expect(history.location.pathname).toBe('/');
    localStorage.clear();
    expect(localStorage.getItem('user')).toBe(null);
  });
});
