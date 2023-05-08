import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import AppProvider from '../context/AppProvider';

const emailString = 'email-input';
const passwordString = 'password-input';
const btnLoginString = 'login-submit-btn';
describe('Testes da página de login', () => {
  it('testa se os inputs e botao estao presentes', () => {
    render(
      <AppProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppProvider>,
    );
    const inputEmail = screen.getByTestId(emailString);
    const inputPassword = screen.getByTestId(passwordString);
    const btnLogin = screen.getByTestId(btnLoginString);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(btnLogin).toBeInTheDocument();
  });
  it('testa se é possivel escrever nos inputs', () => {
    render(
      <AppProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppProvider>,
    );
    const inputEmail = screen.getByTestId(emailString);
    const inputPassword = screen.getByTestId(passwordString);
    const btnLogin = screen.getByTestId(btnLoginString);

    expect(btnLogin).toBeDisabled();

    userEvent.type(inputEmail, 'email@email.com');
    userEvent.type(inputPassword, 'asdasda');

    expect(btnLogin).not.toBeDisabled();
  });
  it('testa se leva a pagina de receitas de comida apos o login', () => {
    // Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockUserData));
    render(
      <AppProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppProvider>,
    );
    const inputEmail = screen.getByTestId(emailString);
    const inputPassword = screen.getByTestId(passwordString);
    const btnLogin = screen.getByTestId(btnLoginString);

    userEvent.type(inputEmail, 'email@email.com');
    userEvent.type(inputPassword, 'asdasda');
    userEvent.click(btnLogin);
    expect(window.location.pathname).toBe('/meals');
  });
});
