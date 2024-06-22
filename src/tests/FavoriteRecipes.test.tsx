import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const favoritePageUrlConst = '/favorite-recipes';
const item1Const = '0-recommendation-card';
const item2Const = '1-recommendation-card';
const item3Const = '2-recommendation-card';
const item4Const = '3-recommendation-card';

const favoriteLocalStorageMock = [
  {
    alcoholicOrNot: '',
    category: 'Side',
    id: '52977',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    name: 'Corba',
    nationality: 'Turkish',
    type: 'meal',
  },
  {
    alcoholicOrNot: '',
    category: 'Side',
    id: '53060',
    image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
    name: 'Burek',
    nationality: 'Croatian',
    type: 'meal',
  },
  {
    alcoholicOrNot: 'Optional alcohol',
    category: 'Ordinary Drink',
    id: '15997',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    name: 'GG',
    nationality: '',
    type: 'drink',
  },
  {
    alcoholicOrNot: 'Alcoholic',
    category: 'Shot',
    id: '15288',
    image: 'https://www.thecocktaildb.com/images/media/drink/rtpxqw1468877562.jpg',
    name: '252',
    nationality: '',
    type: 'drink',
  },
];

describe('Testa a pagina de receitas favoritas', () => {
  afterEach(() => {
    global.localStorage.clear();
  });
  test('1. Testa para ver se os cards são renderizados corretamente na pagina de favoritos', () => {
    global.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteLocalStorageMock));

    renderWithRouterAndRedux(<App />, { initialEntries: [favoritePageUrlConst] });

    const favoriteCard1 = screen.getByTestId(item1Const);
    const favoriteCard2 = screen.getByTestId(item2Const);
    const favoriteCard3 = screen.getByTestId(item3Const);
    const favoriteCard4 = screen.getByTestId(item4Const);
    expect(favoriteCard1 && favoriteCard2 && favoriteCard3 && favoriteCard4).toBeVisible();
  });

  test('2. Testa se é possivel filtrar as receitas favoritas', async () => {
    global.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteLocalStorageMock));

    renderWithRouterAndRedux(<App />, { initialEntries: [favoritePageUrlConst] });

    const favoriteCard1 = screen.getByTestId(item1Const);
    const favoriteCard2 = screen.getByTestId(item2Const);
    const favoriteCard3 = screen.getByTestId(item3Const);
    const favoriteCard4 = screen.getByTestId(item4Const);
    expect(favoriteCard1 && favoriteCard2 && favoriteCard3 && favoriteCard4).toBeVisible();

    const drinksFilterBtn = screen.getByTestId('filter-by-drink-btn');
    await userEvent.click(drinksFilterBtn);
    expect(favoriteCard3 && favoriteCard4).toBeVisible();
    expect(favoriteCard1 && favoriteCard2).not.toBeVisible();

    const removeFilterBtn = screen.getByTestId('filter-by-all-btn');
    await userEvent.click(removeFilterBtn);
    expect(favoriteCard1 && favoriteCard2 && favoriteCard3 && favoriteCard4).toBeVisible();
  });

  test('3. Testa se é possivel remover algum item a partir da pagina de favoritos', async () => {
    global.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteLocalStorageMock));

    renderWithRouterAndRedux(<App />, { initialEntries: [favoritePageUrlConst] });

    const favoriteCard1 = screen.getByTestId(item1Const);
    const favoriteCard2 = screen.getByTestId(item2Const);
    const favoriteCard3 = screen.getByTestId(item3Const);
    const favoriteCard4 = screen.getByTestId(item4Const);
    expect(favoriteCard1 && favoriteCard2 && favoriteCard3 && favoriteCard4).toBeVisible();

    const favoriteBtn2 = screen.getByTestId('1-horizontal-favorite-btn');
    const favoriteBtn3 = screen.getByTestId('2-horizontal-favorite-btn');
    await userEvent.click(favoriteBtn2);
    await userEvent.click(favoriteBtn3);
    expect(favoriteCard2 && favoriteCard3).not.toBeInTheDocument();
    expect(favoriteCard1 && favoriteCard4).toBeVisible();

    const mealsFilterBtn = screen.getByTestId('filter-by-meal-btn');
    await userEvent.click(mealsFilterBtn);

    expect(favoriteCard1).toBeVisible();
    expect(favoriteCard4).not.toBeVisible();

    const drinksFilterBtn = screen.getByTestId('filter-by-drink-btn');
    await userEvent.click(drinksFilterBtn);

    const removeFilterBtn = screen.getByTestId('filter-by-all-btn');
    await userEvent.click(removeFilterBtn);
  });
});
