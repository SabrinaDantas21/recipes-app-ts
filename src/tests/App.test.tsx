import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from '../util/renderWithRouterAndRedux';
import Meals from '../pages/Meals';

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
});
