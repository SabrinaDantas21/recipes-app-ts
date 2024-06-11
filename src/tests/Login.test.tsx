import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Teste para verificar o funcionamento da página de Login', () => {
  test('Teste para verificar a renderização dos inputs', () => {
    renderWithRouterAndRedux(<App />);

    const loginInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginSubmitBtn = screen.getByTestId('login-submit-btn');

    expect(loginInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginSubmitBtn).toBeInTheDocument();
  });

  test('Teste para verificar o comportamento do botão', async () => {
    const user = userEvent.setup();
    renderWithRouterAndRedux(<App />);

    const loginInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginSubmitBtn = screen.getByTestId('login-submit-btn');

    expect(loginSubmitBtn).toBeDisabled();

    await user.type(loginInput, 'umEmail@email.com');

    expect(loginSubmitBtn).toBeDisabled();

    await user.type(passwordInput, 'umaSenhaDaora');

    expect(loginSubmitBtn).not.toBeDisabled();

    await user.click(loginSubmitBtn);

    const mealsTitle = await screen.findByRole('heading', { level: 1, name: 'Meals' });

    expect(mealsTitle).toBeInTheDocument();
  });
});
