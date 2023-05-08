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
// import Meals from '../pages/meals&drinks/Meals';
// import Drinks from '../pages/meals&drinks/Drinks';

const profilePictureId = 'profile-top-btn';
const searchBtnId = 'search-top-btn';
const pageTitleId = 'page-title';
describe('Testes component Header', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve(
        meals,
        drinks,
      ),
    });
  });

  it('testa se os botao de perfil, titulo da pagina e perfil nao estao presentes na rota de receitas de comida', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/meals');

    const profilePicture = await screen.findByTestId(profilePictureId);
    const searchBtn = await screen.findByTestId(searchBtnId);
    const pageTitle = await screen.findByTestId(pageTitleId);

    expect(profilePicture).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });
  it('testa se os botao de perfil, titulo da pagina e perfil nao estao presentes na rota de receitas de drinks', async () => {
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

    const profilePicture = await screen.findByTestId(profilePictureId);
    const searchBtn = await screen.findByTestId(searchBtnId);
    const pageTitle = await screen.findByTestId(pageTitleId);

    expect(profilePicture).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });
  it('testa se os botao de perfil, titulo da pagina e perfil nao estao presentes na rota de receita de uma comida', async () => {
    // Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockUserData));
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/meals/52977');

    const profilePicture = screen.queryByTestId(profilePictureId);
    const searchBtn = screen.queryByTestId(searchBtnId);
    const pageTitle = screen.queryByTestId(pageTitleId);

    expect(profilePicture).not.toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
    expect(pageTitle).not.toBeInTheDocument();
  });
  it('testa se o botao perfil, titulo da pagina e perfil nao estao presentes na rota de receita de uma bebida', async () => {
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

    const profilePicture = screen.queryByTestId(profilePictureId);
    const searchBtn = screen.queryByTestId(searchBtnId);
    const pageTitle = screen.queryByTestId(pageTitleId);

    expect(profilePicture).not.toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
    expect(pageTitle).not.toBeInTheDocument();
  });
  it('testa se o botao perfil, titulo da pagina e perfil nao estao presentes na rota de receita de uma comida em progresso ', async () => {
    // Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockUserData));
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/meals/52977/in-progress');

    const profilePicture = screen.queryByTestId(profilePictureId);
    const searchBtn = screen.queryByTestId(searchBtnId);
    const pageTitle = screen.queryByTestId(pageTitleId);

    expect(profilePicture).not.toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
    expect(pageTitle).not.toBeInTheDocument();
  });
  it('testa se os botaos de perfil, titulo da pagina e perfil nao estao presentes na rota de receita de uma bebida em progesso', () => {
    // Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockUserData));
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/drinks/15997/in-progress');

    const profilePicture = screen.getByTestId(profilePictureId);
    const searchBtn = screen.getByTestId(searchBtnId);
    const pageTitle = screen.getByTestId(pageTitleId);

    expect(profilePicture).not.toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
    expect(pageTitle).not.toBeInTheDocument();
  });
  it('testa se os botao de perfil, titulo da pagina e perfil nao estao presentes na rota profile', async () => {
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
    const searchBtn = screen.queryByTestId(searchBtnId);
    const pageTitle = await screen.findByTestId(pageTitleId);

    expect(profilePicture).toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });
  it('testa se os botao de perfil, titulo da pagina e perfil nao estao presentes na rota de receita prontas', async () => {
    // Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockUserData));
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/done-recipes');

    const profilePicture = await screen.findByTestId(profilePictureId);
    const searchBtn = screen.queryByTestId(searchBtnId);
    const pageTitle = await screen.findByTestId(pageTitleId);

    expect(profilePicture).toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });
  it('testa se os botao de perfil, titulo da pagina e perfil nao estao presentes na rota de receitas favoritas', async () => {
    // Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockUserData));
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/favorite-recipes');

    const profilePicture = await screen.findByTestId(profilePictureId);
    const searchBtn = screen.queryByTestId(searchBtnId);
    const pageTitle = await screen.findByTestId(pageTitleId);

    expect(profilePicture).toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });
  it('testa se clicando no botao de perfil leva a pagina de perfil', async () => {
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

    const profilePicture = await screen.findByTestId(profilePictureId);

    act(() => {
      userEvent.click(profilePicture);
    });

    expect(history.location.pathname).toBe('/profile');
  });
  it('testa se clicando no botao de pesquisa, o input de pesquisa aparece, e clicando novamente o input some', async () => {
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

    const searchBtn = await screen.findByTestId(searchBtnId);

    act(() => {
      userEvent.click(searchBtn);
    });

    const searchInput = await screen.findByTestId('search-input');

    expect(searchInput).toBeInTheDocument();

    act(() => {
      userEvent.click(searchBtn);
    });

    expect(searchInput).not.toBeInTheDocument();
  });
});
