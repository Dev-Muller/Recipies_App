/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import IngredientsList from '../components/ingredientsList/IngredientsList';

describe('IngredientsList', () => {
  test('Testa se renderiza a lista de ingredientes corretamente', () => {
    const ingredients = [
      ['Ingredient 1', 'Measure 1'],
      ['Ingredient 2', 'Measure 2'],
      ['Ingredient 3', 'Measure 3'],
    ];

    render(
      <IngredientsList />,
      {
        wrapper: MemoryRouter,
      },
    );

    ingredients.forEach(([ingredient, measure]) => {
      const ingredientElement = screen.getByText(`${ingredient} - ${measure}`);
      expect(ingredientElement).toBeInTheDocument();
    });
  });

  test('Verifica o ingrediente quando a caixa de seleção for clicada', () => {
    const ingredients = [
      ['Ingredient 1', 'Measure 1'],
      ['Ingredient 2', 'Measure 2'],
      ['Ingredient 3', 'Measure 3'],
    ];

    render(
      <IngredientsList />,
      {
        wrapper: MemoryRouter,
      },
    );

    ingredients.forEach(([ingredient]) => {
      const checkbox = screen.getByLabelText(ingredient);
      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBe(ingredients.length);

    checkboxes.forEach((checkbox) => {
      expect(checkbox).toBeChecked();
    });
  });

  test('Teste se retira o check quando a checkbox é clicada', () => {
    const ingredients = [
      ['Ingredient 1', 'Measure 1'],
      ['Ingredient 2', 'Measure 2'],
      ['Ingredient 3', 'Measure 3'],
    ];

    render(
      <IngredientsList />,
      {
        wrapper: MemoryRouter,
      },
    );

    ingredients.forEach(([ingredient]) => {
      const checkbox = screen.getByLabelText(ingredient);
      fireEvent.click(checkbox);
      fireEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBe(ingredients.length);
  });

  test(' verifica se todos os ingredientes são checkados quando o botão "Selecionar tudo" é clicado', () => {
    const ingredients = [
      ['Ingredient 1', 'Measure 1'],
      ['Ingredient 2', 'Measure 2'],
      ['Ingredient 3', 'Measure 3'],
    ];

    render(
      <IngredientsList />,
      {
        wrapper: MemoryRouter,
      },
    );

    const selectAllButton = screen.getByRole('button', { name: 'Select All' });
    fireEvent.click(selectAllButton);

    ingredients.forEach(([ingredient]) => {
      const checkbox = screen.getByLabelText(ingredient);
      expect(checkbox).toBeChecked();
    });
  });

  test('deve desmarcar todos os ingredientes quando o botão "Desmarcar tudo" for clicado', () => {
    const ingredients = [
      ['Ingredient 1', 'Measure 1'],
      ['Ingredient 2', 'Measure 2'],
      ['Ingredient 3', 'Measure 3'],
    ];

    render(
      <IngredientsList />,
      {
        wrapper: MemoryRouter,
      },
    );

    const unselectAllButton = screen.getByRole('button', { name: 'Unselect All' });
    fireEvent.click(unselectAllButton);

    ingredients.forEach(([ingredient]) => {
      const checkbox = screen.getByLabelText(ingredient);
      expect(checkbox).not.toBeChecked();
    });
  });

  test('deve verificar todos os ingredientes quando o botão "Selecionar tudo" for clicado e desmarcar todos os ingredientes quando o botão "Desmarcar tudo" for clicado', () => {
    const ingredients = [
      ['Ingredient 1', 'Measure 1'],
      ['Ingredient 2', 'Measure 2'],
      ['Ingredient 3', 'Measure 3'],
    ];

    render(
      <IngredientsList />,
      {
        wrapper: MemoryRouter,
      },
    );

    const selectAllButton = screen.getByRole('button', { name: 'Select All' });
    fireEvent.click(selectAllButton);

    ingredients.forEach(([ingredient]) => {
      const checkbox = screen.getByLabelText(ingredient);
      expect(checkbox).toBeChecked();
    });

    const unselectAllButton = screen.getByRole('button', { name: 'Unselect All' });
    fireEvent.click(unselectAllButton);

    ingredients.forEach(([ingredient]) => {
      const checkbox = screen.getByLabelText(ingredient);
      expect(checkbox).not.toBeChecked();
    });
  });
});
