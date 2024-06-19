import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import DoneRecipes from '../pages/DoneRecipes';

const user = userEvent.setup();

const recipes = [{
  alcoholicOrNot: '',
  category: 'Side',
  doneDate: '2024-06-19T03:52:59.574Z',
  id: '52978',
  image: 'https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg',
  name: 'Kumpir',
  nationality: 'Turkish',
  tags: ['SideDish'],
  type: 'meal',
},
{
  alcoholicOrNot: 'Alcoholic',
  category: 'Shot',
  doneDate: '2024-06-19T03:53:11.585Z',
  id: '13501',
  image: 'https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg',
  name: 'ABC',
  nationality: '',
  tags: [],
  type: 'drink',
},
{
  alcoholicOrNot: '',
  category: 'Vegetarian',
  doneDate: '2024-06-19T03:53:28.922Z',
  id: '53027',
  image: 'https://www.themealdb.com/images/media/meals/4er7mj1598733193.jpg',
  name: 'Koshari',
  nationality: 'Egyptian',
  tags: [],
  type: 'meal',
},
];

describe('Testa o funcionamento da página de Receitas Finalizadas', () => {
  beforeEach(() => {
    global.localStorage.setItem('doneRecipes', JSON.stringify(recipes));
  });

  afterEach(() => {
    global.localStorage.clear();
  });

  test('Verifica se o Header esta sendo renderizaado corretamente', () => {
    renderWithRouterAndRedux(<DoneRecipes />);
    const profileBtn = screen.getByRole('img', { name: /Profile Icon/ });
    expect(profileBtn.getAttribute('Alt')).toEqual('Profile Icon');
    expect(profileBtn).toBeVisible();

    const searchBtn = screen.getByRole('heading');
    expect(searchBtn.textContent).toEqual('Done Recipes');
    expect(searchBtn).toBeVisible();
  });

  test('Verifica se os botões de filtro estão sendo renderizados', async () => {
    renderWithRouterAndRedux(<DoneRecipes />);
    const allBtn = screen.getByTestId('filter-by-all-btn');
    const drinksFilterBtn = screen.getByTestId('filter-by-drink-btn');
    const drinksMealsBtn = screen.getByTestId('filter-by-meal-btn');
    expect(allBtn).toBeVisible();
    expect(drinksFilterBtn).toBeVisible();
    expect(drinksMealsBtn).toBeVisible();
  });

  test('Verifica se filtro Meal está funcionando', async () => {
    renderWithRouterAndRedux(<DoneRecipes />);
    const drinksMealsBtn = screen.getByTestId('filter-by-meal-btn');
    await user.click(drinksMealsBtn);

    const drinkRecipes = recipes.filter((recipe) => recipe.type === 'drink');
    drinkRecipes.forEach((recipe) => {
      expect(screen.queryByText(recipe.name)).not.toBeInTheDocument();
    });
  });

  test('Verifica se filtro Drink está funcionando', async () => {
    renderWithRouterAndRedux(<DoneRecipes />);
    const drinksMealsBtn = screen.getByTestId('filter-by-drink-btn');
    await user.click(drinksMealsBtn);

    const drinkRecipes = recipes.filter((recipe) => recipe.type === 'meal');
    drinkRecipes.forEach((recipe) => {
      expect(screen.queryByText(recipe.name)).not.toBeInTheDocument();
    });
  });

  test('Verifica se filtro All está funcionando', async () => {
    renderWithRouterAndRedux(<DoneRecipes />);
    const drinksMealsBtn = screen.getByTestId('filter-by-all-btn');
    await user.click(drinksMealsBtn);

    recipes.forEach((recipe) => {
      expect(screen.queryByText(recipe.name)).toBeInTheDocument();
    });
  });
});
