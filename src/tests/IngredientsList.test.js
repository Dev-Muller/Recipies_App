import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import IngredientsList from '../components/ingredientsList/IngredientsList';
import App from '../App';

describe('IngredientsList', () => {
  const ingredient1 = 'Ingredient 1';
  const ingredient2 = 'Ingredient 2';
  const ingredient3 = 'Ingredient 3';
  const selectAll = 'Select All';
  const unselectAll = 'Unselect All';

  test('Testa se renderiza a lista de ingredientes corretamente', () => {
    const ingredients = [
      [ingredient1, 'Measure 1'],
      [ingredient2, 'Measure 2'],
      [ingredient3, 'Measure 3'],
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
      [ingredient1, 'Measure 1'],
      [ingredient2, 'Measure 2'],
      [ingredient3, 'Measure 3'],
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
      [ingredient1, 'Measure 1'],
      [ingredient2, 'Measure 2'],
      [ingredient3, 'Measure 3'],
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
      [ingredient1, 'Measure 1'],
      [ingredient2, 'Measure 2'],
      [ingredient3, 'Measure 3'],
    ];

    render(
      <IngredientsList />,
      {
        wrapper: MemoryRouter,
      },
    );

    const selectAllButton = screen.getByRole('button', { name: selectAll });
    fireEvent.click(selectAllButton);

    ingredients.forEach(([ingredient]) => {
      const checkbox = screen.getByLabelText(ingredient);
      expect(checkbox).toBeChecked();
    });
  });

  test('deve desmarcar todos os ingredientes quando o botão "Desmarcar tudo" for clicado', () => {
    const ingredients = [
      [ingredient1, 'Measure 1'],
      [ingredient2, 'Measure 2'],
      [ingredient3, 'Measure 3'],
    ];

    render(
      <IngredientsList />,
      {
        wrapper: MemoryRouter,
      },
    );

    const unselectAllButton = screen.getByRole('button', { name: unselectAll });
    fireEvent.click(unselectAllButton);

    ingredients.forEach(([ingredient]) => {
      const checkbox = screen.getByLabelText(ingredient);
      expect(checkbox).not.toBeChecked();
    });
  });

  test('deve verificar todos os ingredientes quando o botão "Selecionar tudo" for clicado e desmarcar todos os ingredientes quando o botão "Desmarcar tudo" for clicado', () => {
    const ingredients = [
      [ingredient1, 'Measure 1'],
      [ingredient2, 'Measure 2'],
      [ingredient3, 'Measure 3'],
    ];

    render(
      <IngredientsList />,
      {
        wrapper: MemoryRouter,
      },
    );

    const selectAllButton = screen.getByRole('button', { name: selectAll });
    fireEvent.click(selectAllButton);

    ingredients.forEach(([ingredient]) => {
      const checkbox = screen.getByLabelText(ingredient);
      expect(checkbox).toBeChecked();
    });

    const unselectAllButton = screen.getByRole('button', { name: unselectAll });
    fireEvent.click(unselectAllButton);

    ingredients.forEach(([ingredient]) => {
      const checkbox = screen.getByLabelText(ingredient);
      expect(checkbox).not.toBeChecked();
    });
  });

  test('deve verificar se o botão "Selecionar tudo" é desabilitado quando todos os ingredientes estiverem selecionados', () => {
    const ingredients = [
      [ingredient1, 'Measure 1'],
      [ingredient2, 'Measure 2'],
      [ingredient3, 'Measure 3'],
    ];

    render(
      <IngredientsList />,
      {
        wrapper: MemoryRouter,
      },
    );

    const selectAllButton = screen.getByRole('button', { name: selectAll });
    fireEvent.click(selectAllButton);

    ingredients.forEach(([ingredient]) => {
      const checkbox = screen.getByLabelText(ingredient);
      expect(checkbox).toBeChecked();
    });

    expect(selectAllButton).toBeDisabled();
  });

  test('deve verificar se o botão "Desmarcar tudo" é desabilitado quando nenhum ingrediente estiver selecionado', () => {
    render(
      <IngredientsList />,
      {
        wrapper: MemoryRouter,
      },
    );

    const unselectAllButton = screen.getByRole('button', { name: unselectAll });
    expect(unselectAllButton).toBeDisabled();
  });

  test('deve verificar se o botão "Desmarcar tudo" é habilitado quando pelo menos um ingrediente estiver selecionado', () => {
    const ingredients = [
      [ingredient1, 'Measure 1'],
      [ingredient2, 'Measure 2'],
      [ingredient3, 'Measure 3'],
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
    });

    const unselectAllButton = screen.getByRole('button', { name: unselectAll });
    expect(unselectAllButton).toBeEnabled();
  });

  test('deve verificar se o botão "Selecionar tudo" é habilitado quando pelo menos um ingrediente não estiver selecionado', () => {
    render(
      <IngredientsList />,
      {
        wrapper: MemoryRouter,
      },
    );

    const selectAllButton = screen.getByRole('button', { name: selectAll });
    expect(selectAllButton).toBeEnabled();
  });

  test('deve verificar se o botão "Desmarcar tudo" é desabilitado quando todos os ingredientes estiverem selecionados', () => {
    const ingredients = [
      [ingredient1, 'Measure 1'],
      [ingredient2, 'Measure 2'],
      [ingredient3, 'Measure 3'],
    ];

    render(
      <IngredientsList />,
      {
        wrapper: MemoryRouter,
      },
    );

    const selectAllButton = screen.getByRole('button', { name: selectAll });
    fireEvent.click(selectAllButton);

    ingredients.forEach(([ingredient]) => {
      const checkbox = screen.getByLabelText(ingredient);
      expect(checkbox).toBeChecked();
    });

    expect(selectAllButton).toBeDisabled();
  });

  test('deve verificar se o botão "Selecionar tudo" é desabilitado quando todos os ingredientes estiverem selecionados', () => {
    render(
      <IngredientsList />,
      {
        wrapper: MemoryRouter,
      },
    );

    const unselectAllButton = screen.getByRole('button', { name: unselectAll });
    expect(unselectAllButton).toBeDisabled();
  });

  it('Verifica se as receitas iniciadas são salvas  o localStorage "inProgressRecipes"', () => {
    const { getByTestId } = renderWithRouter(<App />, { route: '/comidas' });

    const checkbox = getByTestId('0-ingredient-step');
    fireEvent.click(checkbox);

    const recipe = {
      cocktails: {},
      meals: {
        52771: ['0-ingredient-step'],
      },
    };

    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    expect(inProgressRecipes).toEqual(recipe);
  });
});
