/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Recomended from '../components/recomended/Recomended';

describe('Componente Recomended', () => {
  const recipe = {
    idMeal: '52771',
    strMeal: 'Spicy Arrabiata Penne',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    strCategory: 'Vegetarian',
    strArea: 'Italian',
    strInstructions: 'Bring a large pot of water to a boil.',
    strTags: 'Pasta,Curry',
  };
  const recommendedRecipes = [
    {
      idMeal: '52968',
      strMeal: 'Katsu Chicken curry',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/kvbotn1581018863.jpg',
    },
    {
      idMeal: '52970',
      strMeal: 'Kebabs',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg',
    },
  ];

  const mockedContext = {
    apiType: 'Meal',
  };

  beforeEach(() => {
    render(
      <MemoryRouter>
        <AppContext.Provider value={ mockedContext }>
          <Recomended recipe={ recipe } recommendedRecipes={ recommendedRecipes } />
        </AppContext.Provider>
      </MemoryRouter>,
    );
  });

  it('Testa se renderiza o titulo "Recomendadas"', () => {
    const titleElement = screen.getByRole('heading', { name: /recomendadas/i });
    expect(titleElement).toBeInTheDocument();
  });

  it('Testa se renderiza a lista de recomendados', () => {
    const recommendedListElement = screen.getByTestId('recommended-list');
    expect(recommendedListElement).toBeInTheDocument();
  });

  it('testa se renderiza cada receita recomendada com uma imagem, título e detalhes', () => {
    recommendedRecipes.forEach((recommendedRecipe) => {
      const imageElement = screen.getByAltText(recommendedRecipe.strMeal);
      expect(imageElement).toBeInTheDocument();

      const titleElement = screen.getByRole('heading', { name: recommendedRecipe.strMeal });
      expect(titleElement).toBeInTheDocument();

      const detailsButtonElement = screen.getByRole('button', { name: /ver detalhes/i });
      expect(detailsButtonElement).toBeInTheDocument();
    });
  });

  it('deve redirecionar para a página correta de detalhes da receita ao clicar no botão de detalhes', () => {
    const detailsButtonElement = screen.getByRole('button', { name: /ver detalhes/i });
    userEvent.click(detailsButtonElement);

    // Check if the redirection is correct
    expect(window.location.pathname).toEqual(`/details/${recommendedRecipes[0].idMeal}`);
  });

  it('deve renderizar a quantidade correta de receitas recomendados', () => {
    const recommendedListElement = screen.getByTestId('recommended-list');
    const recommendedProductElements = within(recommendedListElement).getAllByTestId(/recommended-product/i);
    expect(recommendedProductElements.length).toEqual(recommendedRecipes.length);
  });

  it('deve processar apenas receitas recomendadas do mesmo tipo (MEALS)', () => {
    const recommendedListElement = screen.getByTestId('recommended-list');
    const recommendedProductElements = within(recommendedListElement).getAllByTestId(/recommended-product/i);

    recommendedProductElements.forEach((recommendedProductElement) => {
      const imageElement = within(recommendedProductElement)
        .getByAltText(recommendedRecipe.strMeal);
      expect(imageElement).toBeInTheDocument();

      const titleElement = within(recommendedProductElement).getByRole('heading', { name: recommendedRecipe.strMeal });
      expect(titleElement).toBeInTheDocument();
    });
  });
});
