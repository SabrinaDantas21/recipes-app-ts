import { vi } from 'vitest';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import mealsCategoryMock from './mocks/mealsCategories.json';
import drinksCategoryMock from './mocks/drinksCategories.json';
import mealsList from './mocks/mealsMock.json';
import drinksList from './mocks/drinksMock.json';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const user = userEvent;
const firstCard = '0-recipe-card';

describe('Testa a página de Receitas.', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test('1. Verifica a funcionalidade dos botões de filtro da página Meals. ', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve(mealsCategoryMock),
    } as Response).mockResolvedValue({
      json: () => Promise.resolve(mealsList),
    } as Response);

    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const beefFilterBtn = await screen.findByTestId('Beef-category-filter');
    await user.click(beefFilterBtn);

    const beefCard1 = await screen.findByTestId(firstCard);
    expect(beefCard1).toBeInTheDocument();

    const allFilterBtn = await screen.findByTestId('All-category-filter');
    await user.click(allFilterBtn);

    const corbaCard = screen.getByRole('button', {
      name: /corba corba/i,
    });
    expect(corbaCard).toBeVisible();
  });
  test('2. Verifica a funcionalidade dos botões de filtro da página Drinks. ', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve(drinksCategoryMock),
    } as Response).mockResolvedValue({
      json: () => Promise.resolve(drinksList),
    } as Response);

    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const cocktailFilterBtn = await screen.findByRole('button', {
      name: /cocktail/i,
    });
    await user.click(cocktailFilterBtn);

    const cocktailCard1 = await screen.findByTestId(firstCard);
    expect(cocktailCard1).toBeInTheDocument();

    const allFilterBtn = await screen.findByTestId('All-category-filter');
    await user.click(allFilterBtn);

    const drinkCard = screen.getByTestId(firstCard);
    expect(drinkCard).toBeVisible();
  });
  test('3. Verifica se ao clicar no card, renderiza a página de RecipeDetails de meals correta.', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve(mealsCategoryMock),
    } as Response).mockResolvedValue({
      json: () => Promise.resolve(mealsList),
    } as Response);
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });
    const corbaCard = await screen.findByTestId('0-card-img');

    await user.click(corbaCard);

    const recipeTitle = screen.getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
  });
  test('4. Verifica se ao clicar no card, renderiza a página de RecipeDetails de drinks correta.', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve(drinksCategoryMock),
    } as Response).mockResolvedValue({
      json: () => Promise.resolve(drinksList),
    } as Response);
    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });
    const drinkCard = await screen.findByTestId('0-card-img');

    await user.click(drinkCard);

    const recipeTitle = screen.getByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
  });
});
