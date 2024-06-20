import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { singleDrinkSearchMock, singleMealSearchMock } from './helpers/mocks';
import App from '../App';

// put in typos
const finishBtnTestId = 'finish-recipe-btn';

describe('Testes que cobrem a página RecipesInProgress', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('Testando se a rota renderiza direito para uma meal', async () => {
    global.fetch = vi.fn(() => Promise.resolve({
      json: () => Promise.resolve(singleMealSearchMock),
    })) as any;

    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals/53026/in-progress'] });

    expect(global.fetch).toHaveBeenCalledTimes(1);

    const recipeTitle = await screen.findByText('Tamiya');
    const recipeCategory = await screen.findByText('Vegetarian');
    const recipeIngredient = await screen.findByLabelText(/Broad Beans/);
    const recipeInstruction = await screen.findByText(/If skinless beans are unavailable/);
    const finishRecipeBtn = await screen.findByTestId(finishBtnTestId);

    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(recipeIngredient).toBeInTheDocument();
    expect(recipeInstruction).toBeInTheDocument();
    expect(finishRecipeBtn).toBeInTheDocument();
    expect(finishRecipeBtn).toBeDisabled();
  });

  test('Testando se a rota renderiza direito para um drink', async () => {
    global.fetch = vi.fn(() => Promise.resolve({
      json: () => Promise.resolve(singleDrinkSearchMock),
    })) as any;

    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks/14610/in-progress'] });

    expect(global.fetch).toHaveBeenCalledTimes(1);

    const recipeTitle = await screen.findByText(/ACID/);
    const recipeCategory = await screen.findByText(/Shot/);
    const recipeIngredient = await screen.findByLabelText(/Wild Turkey/);
    const recipeInstruction = await screen.findByText(/Poor in the 151 first followed/);
    const finishRecipeBtn = await screen.findByTestId(finishBtnTestId);

    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(recipeIngredient).toBeInTheDocument();
    expect(recipeInstruction).toBeInTheDocument();
    expect(finishRecipeBtn).toBeInTheDocument();
    expect(finishRecipeBtn).toBeDisabled();
  });

  test('Testando se os checks e o botão de finish recipe na rota do meal funcionam como esperado', async () => {
    global.fetch = vi.fn(() => Promise.resolve({
      json: () => Promise.resolve(singleMealSearchMock),
    })) as any;

    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals/53026/in-progress'] });

    expect(global.fetch).toHaveBeenCalledTimes(1);

    const recipeIngredient1 = await screen.findByLabelText(/Broad Beans/);
    const recipeIngredient2 = await screen.findByLabelText(/Spring Onions/);
    const recipeIngredient3 = await screen.findByLabelText(/Garlic Clove/);
    const recipeIngredient4 = await screen.findByLabelText(/Parsley/);
    const recipeIngredient5 = await screen.findByLabelText(/Cumin/);
    const recipeIngredient6 = await screen.findByLabelText(/Baking Powder/);
    const recipeIngredient7 = await screen.findByLabelText(/Cayenne Pepper/);
    const recipeIngredient8 = await screen.findByLabelText(/Flour -Spinkling/);
    const recipeIngredient9 = await screen.findByLabelText(/Vegetable Oil/);

    const finishRecipeBtn = await screen.findByTestId(finishBtnTestId);

    expect(recipeIngredient1).not.toBeChecked();
    expect(recipeIngredient2).not.toBeChecked();
    expect(recipeIngredient3).not.toBeChecked();
    expect(recipeIngredient4).not.toBeChecked();
    expect(recipeIngredient5).not.toBeChecked();
    expect(recipeIngredient6).not.toBeChecked();
    expect(recipeIngredient7).not.toBeChecked();
    expect(recipeIngredient8).not.toBeChecked();
    expect(recipeIngredient9).not.toBeChecked();

    expect(finishRecipeBtn).toBeInTheDocument();
    expect(finishRecipeBtn).toBeDisabled();

    await userEvent.click(recipeIngredient1);
    await userEvent.click(recipeIngredient2);
    await userEvent.click(recipeIngredient3);
    await userEvent.click(recipeIngredient4);
    await userEvent.click(recipeIngredient5);
    await userEvent.click(recipeIngredient6);
    await userEvent.click(recipeIngredient7);
    await userEvent.click(recipeIngredient8);
    await userEvent.click(recipeIngredient9);

    const finishRecipeBtnEnabled = await screen.findByTestId(finishBtnTestId);

    expect(finishRecipeBtnEnabled).not.toBeDisabled();

    await userEvent.click(finishRecipeBtnEnabled);

    const doneRecipesTitle = await screen.findByText(/Done Recipes/);
    expect(doneRecipesTitle).toBeInTheDocument();
  });

  test('Testando se os checks e o botão de finish recipe na rota do drinks funcionam como esperado', async () => {
    global.fetch = vi.fn(() => Promise.resolve({
      json: () => Promise.resolve(singleDrinkSearchMock),
    })) as any;

    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks/14610/in-progress'] });

    expect(global.fetch).toHaveBeenCalledTimes(1);

    const recipeIngredient1 = await screen.findByLabelText(/151 proof/);
    const recipeIngredient2 = await screen.findByLabelText(/Wild Turkey/);

    const finishRecipeBtn = await screen.findByTestId(finishBtnTestId);

    expect(recipeIngredient1).not.toBeChecked();
    expect(recipeIngredient2).not.toBeChecked();

    expect(finishRecipeBtn).toBeInTheDocument();
    expect(finishRecipeBtn).toBeDisabled();

    await userEvent.click(recipeIngredient1);
    await userEvent.click(recipeIngredient2);

    const finishRecipeBtnEnabled = await screen.findByTestId(finishBtnTestId);

    expect(finishRecipeBtnEnabled).not.toBeDisabled();

    await userEvent.click(finishRecipeBtnEnabled);

    const doneRecipesTitle = await screen.findByText(/Done Recipes/);
    expect(doneRecipesTitle).toBeInTheDocument();
  });
});
