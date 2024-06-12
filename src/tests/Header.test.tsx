import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from '../util/renderWithRouterAndRedux';
import Meals from '../pages/Meals';

const user = userEvent.setup();

describe('Testa o componente Header e suas funcionalidades', () => {
  test('1. Verifica o componente Header é renderizado corretamente.', () => {
    renderWithRouterAndRedux(<Meals />, {
      initialState: { loginReducer: { isAuthenticated: true }, pageReducer: { currentPage: 1 } },
      route: '/meals',
    });
    const SearchBtn = screen.getByRole('img', { name: /search icon/i });
    expect(SearchBtn).toBeVisible();

    const ProfileBtn = screen.getByRole('img', { name: /profile icon/i });
    expect(ProfileBtn).toBeVisible();
  });
  test('2. Verifica se o ProfileBtn funciona conforme esperado.', async () => {
    renderWithRouterAndRedux(<Meals />, {
      initialState: { loginReducer: { isAuthenticated: true }, pageReducer: { currentPage: 1 } },
      route: '/meals',
    });

    const ProfileBtn = screen.getByRole('img', { name: /profile icon/i });
    await user.click(ProfileBtn);

    const title = screen.getByTestId('page-title');
    expect(title).toBeVisible();
  });
  test('3. Verifica se o SearchBtn funciona conforme esperado.', async () => {
    renderWithRouterAndRedux(<Meals />, {
      initialState: { loginReducer: { isAuthenticated: true }, pageReducer: { currentPage: 1 } },
      route: '/meals',
    });

    const SearchBtn = screen.getByRole('img', { name: /search icon/i });
    await user.click(SearchBtn);

    const SearchBar = screen.getByTestId('search-input');
    expect(SearchBar).toBeVisible();
  });
});
