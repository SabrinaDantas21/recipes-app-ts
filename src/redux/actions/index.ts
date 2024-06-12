import { SET_CREDENTIALS, SET_PAGE } from '../../util/typos';
import { SetCredentialsPayloadType } from '../../util/types';

export const setCredentials = ({ email, password }: SetCredentialsPayloadType) => ({
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
