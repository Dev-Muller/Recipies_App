/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';
import RecipeDetails from '../pages/recipeDetails/RecipeDetails';
import AppProvider from '../context/AppProvider';
import { drinks } from '../../cypress/mocks/drinks';
import { meals } from '../../cypress/mocks/meals';

// import setLocalStorage from './helpers/localStorageMock';

describe('Verifica requests da API', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve(
        meals,
        drinks,
      ),
    });
  });

  const renderWithRouter = (component, initialRoute = '/') => {
    const history = createMemoryHistory({ initialEntries: [initialRoute] });
    return ({
      ...render(<Router history={ history }>{component}</Router>), history,
    });
  };

  it('Verifica se a requisição para a API de comidas foi realizada', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    // eslint-disable-next-line sonarjs/no-duplicate-string
    history.push('/recipe-details');

    await waitFor(() => {
      // eslint-disable-next-line sonarjs/no-duplicate-string
      expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
      // eslint-disable-next-line sonarjs/no-duplicate-string
      expect(screen.getByTestId('0-ingredient-name-and-measure')).toBeInTheDocument();
      // eslint-disable-next-line sonarjs/no-duplicate-string
      expect(screen.getByTestId('favorite-btn')).toHaveAttribute('src', '/static/media/whiteHeartIcon.6690d94e688d445712c855c7ded7389b.svg');
    });
  });

  it('Verifica se a requisição para a API de bebidas foi realizada', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/recipe-details');

    await waitFor(() => {
      expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
      expect(screen.getByTestId('0-ingredient-name-and-measure')).toBeInTheDocument();
      expect(screen.getByTestId('favorite-btn')).toHaveAttribute('src', '/static/media/whiteHeartIcon.6690d94e688d445712c855c7ded7389b.svg');
    });
  });

  it('Verifica se a categoria da receita é renderizada corretamente', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/recipe-details');

    await waitFor(() => {
      expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    });

    const category = screen.getByTestId('recipe-category');
    expect(category).toHaveTextContent('Beef');
  });

  it('Verifica se os ingredientes da receita são renderizados corretamente', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/recipe-details');
    await waitFor(() => {
      expect(screen.getByTestId('0-ingredient-name-and-measure')).toBeInTheDocument();
    });
  });

  it('Verifica se o vídeo da receita é renderizado corretamente', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/recipe-details');
    await waitFor(() => {
      expect(screen.getByTestId('video')).toBeInTheDocument();
    });
  });

  it('Verifica se as instruções da receita são renderizadas corretamente', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/recipe-details');
    await waitFor(() => {
      expect(screen.getByTestId('instructions')).toBeInTheDocument();
    });
  });

  it('Verifica se os cards de recomendações são renderizados corretamente', async () => {
    renderWithRouter(<RecipeDetails />);
    await waitFor(() => {
      expect(screen.getByTestId('0-recomendation-card')).toBeInTheDocument();
    });
  });

  it('Verifica se o botão de favoritar funciona corretamente', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/recipe-details');
    await waitFor(() => {
      expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();

      const favoriteBtn = screen.getByTestId('favorite-btn');
      userEvent.click(favoriteBtn);
      // eslint-disable-next-line sonarjs/no-duplicate-string
      expect(favoriteBtn).toHaveAttribute('src', '/static/media/blackHeartIcon.7ad5c5d3.svg');
    });
  });

  it('Verifica se o botão de compartilhar funciona corretamente', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/recipe-details');
    await waitFor(() => {
      expect(screen.getByTestId('share-btn')).toBeInTheDocument();

      const shareBtn = screen.getByTestId('share-btn');
      userEvent.click(shareBtn);
      expect(shareBtn).toHaveAttribute('src', '/static/media/shareIcon.8e3e6c5d.svg');
    });
  });

  it('Verifica se o botão de iniciar receita funciona corretamente', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/recipe-details');
    await waitFor(() => {
      // eslint-disable-next-line sonarjs/no-duplicate-string
      expect(screen.getByTestId('start-recipe-btn')).toBeInTheDocument();

      const startRecipeBtn = screen.getByTestId('start-recipe-btn');
      userEvent.click(startRecipeBtn);
      // eslint-disable-next-line sonarjs/no-duplicate-string
      expect(startRecipeBtn).toHaveTextContent('Continuar Receita');
    });
  });

  it('Verifica se o botão de finalizar receita funciona corretamente', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/recipe-details');
    await waitFor(() => {
      // eslint-disable-next-line sonarjs/no-duplicate-string
      expect(screen.getByTestId('finish-recipe-btn')).toBeInTheDocument();

      const finishRecipeBtn = screen.getByTestId('finish-recipe-btn');
      userEvent.click(finishRecipeBtn);
      expect(finishRecipeBtn).toHaveTextContent('Avaliar');
    });
  });

  it('Testa se o clique no botão de favoritar adiciona a receita aos favoritos', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/recipe-details');
    await waitFor(() => {
      expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();

      const favoriteBtn = screen.getByTestId('favorite-btn');
      userEvent.click(favoriteBtn);
      expect(favoriteBtn).toHaveAttribute('src', '/static/media/blackHeartIcon.7ad5c5d3.svg');

      userEvent.click(favoriteBtn);
      expect(favoriteBtn).toHaveAttribute('src', '/static/media/whiteHeartIcon.6690d94e688d445712c855c7ded7389b.svg');

      userEvent.click(favoriteBtn);
      expect(favoriteBtn).toHaveAttribute('src', '/static/media/blackHeartIcon.7ad5c5d3.svg');
    });
  });

  it('Testa se o clique no botão de compartilhar copia o link da receita', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/recipe-details');
    await waitFor(() => {
      expect(screen.getByTestId('share-btn')).toBeInTheDocument();

      const shareBtn = screen.getByTestId('share-btn');
      userEvent.click(shareBtn);
      expect(shareBtn).toHaveAttribute('src', '/static/media/shareIcon.8e3e6c5d.svg');
    });
  });

  it('Testa se o clique no botão de iniciar a receita envia os dados corretamente', async () => {
    renderWithRouter(<RecipeDetails />);
    await waitFor(() => {
      expect(screen.getByTestId('start-recipe-btn')).toBeInTheDocument();

      const startRecipeBtn = screen.getByTestId('start-recipe-btn');
      userEvent.click(startRecipeBtn);
      expect(startRecipeBtn).toHaveTextContent('Continuar Receita');

      userEvent.click(startRecipeBtn);
      expect(startRecipeBtn).toHaveTextContent('Continuar Receita');
    });
  });

  it('Verifica se a função fetchById é chamada corretamente na inicialização do componente', async () => {
    const fetchById = jest.spyOn(RecipesAPI, 'fetchById');
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/recipe-details');
    await waitFor(() => {
      expect(fetchById).toHaveBeenCalled();
      expect(fetchById).toHaveBeenCalledWith('15997');
    });
  });

  it('Verifica se a função fetchById é chamada corretamente ao clicar no botão de favoritar', async () => {
    const fetchById = jest.spyOn(RecipesAPI, 'fetchById');
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/recipe-details');
    await waitFor(() => {
      expect(fetchById).toHaveBeenCalled();
      expect(fetchById).toHaveBeenCalledWith('15997');
    });
  });

  it('Verifica se a função fetchById é chamada corretamente ao clicar no botão de compartilhar', async () => {
    const fetchById = jest.spyOn(RecipesAPI, 'fetchById');
    renderWithRouter(<RecipeDetails />);
    await waitFor(() => {
      expect(fetchById).toHaveBeenCalled();
      expect(fetchById).toHaveBeenCalledWith('15997');
    });
  });

  it('Verifica se a função fetchById é chamada corretamente ao clicar no botão de iniciar a receita', async () => {
    const fetchById = jest.spyOn(RecipesAPI, 'fetchById');
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/recipe-details');
    await waitFor(() => {
      expect(fetchById).toHaveBeenCalled();
      expect(fetchById).toHaveBeenCalledWith('15997');
    });
  });

  it('should display recipe details', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/recipe-details');

    await waitFor(() => {
      expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
      expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
      expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
      expect(screen.getByTestId('instructions')).toBeInTheDocument();
    });
  });

  it('should handle favorite button click', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/recipe-details');
    await waitFor(() => {
      const favoriteBtn = screen.getByTestId('favorite-btn');
      userEvent.click(favoriteBtn);

      expect(favoriteBtn).toHaveAttribute('src', '/static/media/blackHeartIcon.svg');

      userEvent.click(favoriteBtn);

      expect(favoriteBtn).toHaveAttribute('src', '/static/media/whiteHeartIcon.svg');
    });
  });

  it('should handle share button click', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/recipe-details');

    await waitFor(() => {
      const shareBtn = screen.getByTestId('share-btn');
      userEvent.click(shareBtn);

      expect(shareBtn).toHaveAttribute('src', '/static/media/shareIcon.svg');
    });
  });

  it('should display recommended recipes', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/recipe-details');

    await waitFor(() => {
      expect(screen.getByTestId('recomendation-card')).toBeInTheDocument();
    });
  });

  it('should handle start recipe button click', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/recipe-details');

    await waitFor(() => {
      const startRecipeBtn = screen.getByTestId('start-recipe-btn');
      userEvent.click(startRecipeBtn);

      expect(startRecipeBtn).toHaveTextContent('Continuar Receita');
    });
  });

  it('should handle finish recipe button click', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>,
    );
    history.push('/recipe-details');

    await waitFor(() => {
      const finishRecipeBtn = screen.getByTestId('finish-recipe-btn');
      userEvent.click(finishRecipeBtn);

      expect(finishRecipeBtn).toHaveTextContent('Avaliar');
    });
  });
});
