import { SetCredentialsPayloadType } from '../../util/types';
import { SET_CREDENTIALS } from '../../util/typos';

export const setCredentials = ({ email, password }: SetCredentialsPayloadType) => ({
  type: SET_CREDENTIALS,
  payload: {
    email,
    password,
  },
});
