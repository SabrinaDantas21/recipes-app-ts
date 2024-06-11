import { SET_CREDENTIALS, SET_PAGE } from '../../util/typos';

export const setCredentials = (email: string, password: string) => ({
  type: SET_CREDENTIALS,
  payload: {
    email,
    password,
  },
});

export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page,
});
