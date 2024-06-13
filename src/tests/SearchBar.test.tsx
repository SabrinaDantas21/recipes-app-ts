import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import SearchBar from '../components/SearchBar';

const user = userEvent.setup();
const nameRadioInputTestId = 'name-search-radio';
const searchInputTestId = 'search-input';
const searchBtnTestId = 'exec-search-btn';

describe('Testa a SearchBar', () => {
  test('1. Testa se é possivel escrever na searchBar e selecionar algum dos radioBtns', async () => {
    renderWithRouterAndRedux(<SearchBar page="meals" />);

    const nameRadioBtn = screen.getByTestId(nameRadioInputTestId);
    await user.click(nameRadioBtn);
    const searchInput = screen.getByTestId(searchInputTestId);
    await user.type(searchInput, 'Arrabiata');
  });

  test('2. Testa a pesquisa a partr da pagina de "meals"', async () => {
    renderWithRouterAndRedux(<SearchBar page="meals" />);

    const nameRadioBtn = screen.getByTestId(nameRadioInputTestId);
    await user.click(nameRadioBtn);
    const searchInput = screen.getByTestId(searchInputTestId);
    await user.type(searchInput, 'Arrabiata');
    const submmitBtn = screen.getByTestId(searchBtnTestId);
    await user.click(submmitBtn);
  });

  test('3. Testa a pesquisa a partr da pagina de "drinks"', async () => {
    renderWithRouterAndRedux(<SearchBar page="drinks" />);

    const nameRadioBtn = screen.getByTestId(nameRadioInputTestId);
    await user.click(nameRadioBtn);
    const searchInput = screen.getByTestId(searchInputTestId);
    await user.type(searchInput, 'marguerita');
    const submmitBtn = screen.getByTestId(searchBtnTestId);
    await user.click(submmitBtn);
  });

  test('4. Testa se a pagina solta um alert quando pesquisar um item que não exista', async () => {
    renderWithRouterAndRedux(<SearchBar page="meals" />);

    const nameRadioBtn = screen.getByTestId(nameRadioInputTestId);
    await user.click(nameRadioBtn);
    const searchInput = screen.getByTestId(searchInputTestId);
    await user.type(searchInput, 'Xablau');
    const submmitBtn = screen.getByTestId(searchBtnTestId);
    await user.click(submmitBtn);
  });

  test('5. Testa mudança de pagina caso só encontre uma bebida com aquele nome', async () => {
    renderWithRouterAndRedux(<SearchBar page="drinks" />);

    const nameRadioBtn = screen.getByTestId(nameRadioInputTestId);
    await user.click(nameRadioBtn);
    const searchInput = screen.getByTestId(searchInputTestId);
    await user.type(searchInput, 'smut');
    const submmitBtn = screen.getByTestId(searchBtnTestId);
    await user.click(submmitBtn);
  });
});
