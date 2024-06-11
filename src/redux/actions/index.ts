import { SET_CREDENTIALS } from '../../util/typos';

export const setCredentials = (email: string, password: string) => ({
  type: SET_CREDENTIALS,
  payload: {
    email,
    password,
  },
});
