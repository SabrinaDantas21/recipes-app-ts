import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const clickProfileTopBtn = async () => {
  const profileTopBtn = await screen.findByTestId('profile-top-btn');
  await userEvent.click(profileTopBtn);
};

describe('Teste para verificar o funcionamento da página Profile', async () => {
  test('Teste para verificar o Header e o email', async () => {
    renderWithRouterAndRedux(<App />);
    const loginInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const validEmail = 'trybe@gmail.com';
    const validPassword = 'abcdefg';
    const loginSubmitBtn = screen.getByTestId('login-submit-btn');
    await userEvent.type(loginInput, validEmail);
    await userEvent.type(passwordInput, validPassword);
    await userEvent.click(loginSubmitBtn);
    await clickProfileTopBtn();

    const titleProfile = screen.getByTestId('page-title');
    const email = screen.getByTestId('profile-email');

    expect(titleProfile).toBeInTheDocument();
    expect(email).toHaveTextContent('trybe@gmail.com');
    expect(email).toBeInTheDocument();
  });
  test('testando os botões', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/profile'] });
    const btnDoneRecipes = screen.getByTestId('profile-done-btn');
    expect(btnDoneRecipes).toBeVisible();

    await userEvent.click(btnDoneRecipes);

    expect(screen.getByRole('heading', { level: 1, name: 'Done Recipes' })).toBeInTheDocument();

    await clickProfileTopBtn();

    expect(screen.getByRole('heading', { level: 1, name: 'Profile' })).toBeInTheDocument();

    const btnFavorite = await screen.findByTestId('profile-favorite-btn');

    await userEvent.click(btnFavorite);

    expect(screen.getByRole('heading', { level: 1, name: 'Favorite Recipes' })).toBeInTheDocument();

    await clickProfileTopBtn();

    const btnDrinks = screen.getByTestId('drinks-bottom-btn');

    await userEvent.click(btnDrinks);

    expect(screen.getByRole('heading', { level: 1, name: 'Drinks' })).toBeInTheDocument();

    await clickProfileTopBtn();

    const btnMeals = screen.getByTestId('meals-bottom-btn');

    await userEvent.click(btnMeals);

    expect(screen.getByRole('heading', { level: 1, name: 'Meals' })).toBeInTheDocument();

    await clickProfileTopBtn();

    const btnLogout = screen.getByTestId('profile-logout-btn');

    await userEvent.click(btnLogout);

    expect(screen.getByTestId('email-input')).toBeInTheDocument();
  });
  test('Teste para verificar se não existe o email se o local storage for vazio', async () => {
    localStorage.clear();
    renderWithRouterAndRedux(<App />, { initialEntries: ['/profile'] });
    const email = screen.queryByTestId('profile-email');
    expect(email).toBeNull();
  });
});
