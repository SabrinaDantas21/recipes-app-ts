import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Meals from '../pages/Meals';
import renderWithRouterAndRedux from '../util/renderWithRouterAndRedux';

const user = userEvent.setup();

describe('Testa o footer', () => {
  test('1. Testa se o footer é rederizado de forma correta na pagina de meals, e se é possivel ir até a página de drinks atraves dele', async () => {
    renderWithRouterAndRedux(<Meals />, {
      initialState: { loginReducer: { isAuthenticated: true }, pageReducer: { currentPage: 1 } },
      route: '/meals',
    });

    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    await user.click(drinksBtn);
    const drinksTitle = screen.getByTestId('page-title');
    expect(drinksTitle).toBeVisible();
  });

  test('2. Testa se o footer é rederizado de forma correta na pagina de drinks, e se é possivel ir até a página de meals atraves dele', async () => {
    renderWithRouterAndRedux(<Meals />, {
      initialState: { loginReducer: { isAuthenticated: true }, pageReducer: { currentPage: 1 } },
      route: '/drinks',
    });

    const drinksBtn = screen.getByTestId('meals-bottom-btn');
    await user.click(drinksBtn);
    const drinksTitle = screen.getByTestId('page-title');
    expect(drinksTitle).toBeVisible();
  });

  test('3. Testa se o footer é renderizado na pagina profile', () => {
    renderWithRouterAndRedux(<Meals />, {
      initialState: { loginReducer: { isAuthenticated: true }, pageReducer: { currentPage: 1 } },
      route: '/profile',
    });

    const footer = screen.getByTestId('footer');
    expect(footer).toBeVisible();
  });
});
