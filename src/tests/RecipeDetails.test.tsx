import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa a pagina de detalhes de uma receita', () => {
  test('1. Testa a pagina de detalhes de uma meal é renderizada corretamente', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals/52977'] });
  });
});
