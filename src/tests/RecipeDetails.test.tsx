import { vi } from 'vitest';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import oneMealMock from './mocks/oneMealMock.json';
import oneDrinkMock from './mocks/oneDrinkMock.json';
import mealsMock from './mocks/mealsMock.json';
import drinksMock from './mocks/drinksMock.json';
import App from '../App';

const mealRoute = '/meals/52977';
const startRecipe = 'start-recipe-btn';

const inProgressLocalStorage = {
  drinks: {},
  meals: { 52977: [] },
};

const doneLocalStorage = [{
  id: '52977',
  image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  name: 'Corba',
  nationality: 'Turkish',
  alcoholicOrNot: '',
  category: 'Side',
  doneDate: '2024-06-21T22:46:22.309Z',
  type: 'meal',
  tags: ['Soup'],
}];

describe('Testa a pagina de detalhes de uma receita', () => {
  afterEach(() => {
    vi.resetAllMocks();
    global.localStorage.clear();
  });
  test('1. Testa se pagina de detalhes de uma meal é renderizada corretamente', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve(oneMealMock),
    } as Response).mockResolvedValueOnce({
      json: () => Promise.resolve(drinksMock),
    } as Response).mockResolvedValueOnce({
      json: () => Promise.resolve(drinksMock),
    } as Response);

    renderWithRouterAndRedux(<App />, { initialEntries: [mealRoute] });

    expect(global.fetch).toHaveBeenCalledTimes(3);

    const mealImg = await screen.findByTestId('recipe-photo');
    expect(mealImg).toBeVisible();

    const carousel = await screen.findByTestId('carousel-container');
    expect(carousel).toBeVisible();
  });

  test('2. Testa se a pagina de detalhes de um drink é renderizada corretamente', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve(oneDrinkMock),
    } as Response).mockResolvedValueOnce({
      json: () => Promise.resolve(mealsMock),
    } as Response).mockResolvedValueOnce({
      json: () => Promise.resolve(mealsMock),
    } as Response);

    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks/15997'] });

    expect(global.fetch).toHaveBeenCalledTimes(3);

    const drinkImg = await screen.findByTestId('recipe-photo');
    expect(drinkImg).toBeVisible();
  });

  test('3. Testa se existe um botão "start recipe" se a receita ainda não foi iniciada ou concluida', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve(oneMealMock),
    } as Response).mockResolvedValueOnce({
      json: () => Promise.resolve(drinksMock),
    } as Response).mockResolvedValueOnce({
      json: () => Promise.resolve(drinksMock),
    } as Response);

    renderWithRouterAndRedux(<App />, { initialEntries: [mealRoute] });

    const startBtn = await screen.findByTestId(startRecipe);
    expect(startBtn).toHaveTextContent('Start Recipe');
    await userEvent.click(startBtn);
  });

  test('4. Testa se existe um botão "continue recipe" se a receita ja foi iniciada mas não concluida', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve(oneMealMock),
    } as Response).mockResolvedValueOnce({
      json: () => Promise.resolve(drinksMock),
    } as Response).mockResolvedValueOnce({
      json: () => Promise.resolve(drinksMock),
    } as Response);
    global.localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressLocalStorage));

    renderWithRouterAndRedux(<App />, { initialEntries: [mealRoute] });

    const continueBtn = await screen.findByTestId(startRecipe);
    expect(continueBtn).toHaveTextContent('Continue Recipe');
    await userEvent.click(continueBtn);
  });

  test('5. Testa se não existe um botão caso a receita ja tenha sido terminada', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve(oneMealMock),
    } as Response).mockResolvedValueOnce({
      json: () => Promise.resolve(drinksMock),
    } as Response).mockResolvedValueOnce({
      json: () => Promise.resolve(drinksMock),
    } as Response);
    global.localStorage.setItem('doneRecipes', JSON.stringify(doneLocalStorage));

    renderWithRouterAndRedux(<App />, { initialEntries: [mealRoute] });

    const continueBtn = screen.getByTestId('start-recipe-btn-container');
    expect(continueBtn).toHaveTextContent('');
  });

  test('6. Testa se o botão funciona qunado a página é de drinks', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve(oneDrinkMock),
    } as Response).mockResolvedValueOnce({
      json: () => Promise.resolve(mealsMock),
    } as Response).mockResolvedValueOnce({
      json: () => Promise.resolve(mealsMock),
    } as Response);

    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks/15997'] });

    const startBtn = await screen.findByTestId(startRecipe);
    expect(startBtn).toHaveTextContent('Start Recipe');
    await userEvent.click(startBtn);
  });

  test('7. Testa o botão de compartilhar e favoritar da pagina de detalhes de uma receita', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve(oneMealMock),
    } as Response).mockResolvedValueOnce({
      json: () => Promise.resolve(drinksMock),
    } as Response).mockResolvedValueOnce({
      json: () => Promise.resolve(drinksMock),
    } as Response);

    renderWithRouterAndRedux(<App />, { initialEntries: [mealRoute] });

    const shareBtn = screen.getByTestId('share-btn');
    expect(shareBtn).toBeVisible();

    const favoriteBtn = screen.getByTestId('favorite-btn');
    await userEvent.click(favoriteBtn);
    expect(favoriteBtn).toBeVisible();
    await userEvent.click(favoriteBtn);
  });
});
