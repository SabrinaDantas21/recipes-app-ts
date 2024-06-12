import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from '../util/renderWithRouterAndRedux';
import Meals from '../pages/Meals';
import SearchBar from '../components/SearchBar';

const user = userEvent.setup();

describe('Testa a SearchBar', () => {
  test('1. Testa se é possivel escrever na searchBar e selecionar algum dos radioBtns', async () => {
    renderWithRouterAndRedux(<SearchBar page="meals" />, {
      initialState: { loginReducer: { isAuthenticated: true }, pageReducer: { currentPage: 1 } },
      route: '/meals',
    });

    const nameRadioBtn = screen.getByTestId('name-search-radio');
    await user.click(nameRadioBtn);
    const searchInput = screen.getByTestId('search-input');
    await user.type(searchInput, 'Arrabiata');
  });

  test('2. Testa a pesquisa a partr da pagina de "meals"', async () => {
    renderWithRouterAndRedux(<SearchBar page="meals" />, {
      initialState: { loginReducer: { isAuthenticated: true }, pageReducer: { currentPage: 1 } },
      route: '/meals',
    });

    const nameRadioBtn = screen.getByTestId('name-search-radio');
    await user.click(nameRadioBtn);
    const searchInput = screen.getByTestId('search-input');
    await user.type(searchInput, 'Arrabiata');
    const submmitBtn = screen.getByTestId('exec-search-btn');
    await user.click(submmitBtn);
  });

  test('3. Testa a pesquisa a partr da pagina de "drinks"', async () => {
    renderWithRouterAndRedux(<SearchBar page="drinks" />, {
      initialState: { loginReducer: { isAuthenticated: true }, pageReducer: { currentPage: 1 } },
      route: '/meals',
    });

    const nameRadioBtn = screen.getByTestId('name-search-radio');
    await user.click(nameRadioBtn);
    const searchInput = screen.getByTestId('search-input');
    await user.type(searchInput, 'marguerita');
    const submmitBtn = screen.getByTestId('exec-search-btn');
    await user.click(submmitBtn);
  });

  test('4. Testa se a pagina solta um alert quando pesquisar um item que não exista', async () => {
    renderWithRouterAndRedux(<SearchBar page="meals" />, {
      initialState: { loginReducer: { isAuthenticated: true }, pageReducer: { currentPage: 1 } },
      route: '/meals',
    });

    const nameRadioBtn = screen.getByTestId('name-search-radio');
    await user.click(nameRadioBtn);
    const searchInput = screen.getByTestId('search-input');
    await user.type(searchInput, 'Xablau');
    const submmitBtn = screen.getByTestId('exec-search-btn');
    await user.click(submmitBtn);
  });

  test('5. Testa mudança de pagina caso só encontre uma bebida com aquele nome', async () => {
    renderWithRouterAndRedux(<SearchBar page="drinks" />, {
      initialState: { loginReducer: { isAuthenticated: true }, pageReducer: { currentPage: 1 } },
      route: '/meals',
    });

    const nameRadioBtn = screen.getByTestId('name-search-radio');
    await user.click(nameRadioBtn);
    const searchInput = screen.getByTestId('search-input');
    await user.type(searchInput, 'smut');
    const submmitBtn = screen.getByTestId('exec-search-btn');
    await user.click(submmitBtn);
  });
});
