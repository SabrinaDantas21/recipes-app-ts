import { render } from '@testing-library/react';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import rootReducer from '../redux/reducers/index';

const renderWithRouterAndRedux = (
  ui,
  {
    initialState,
    store = createStore(rootReducer, initialState),
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {},
) => {
  return {
    ...render(
      <Provider store={ store }>
        <BrowserRouter>
          {ui}
        </BrowserRouter>
      </Provider>,
    ),
    store,
    history,
  };
};

export default renderWithRouterAndRedux;
