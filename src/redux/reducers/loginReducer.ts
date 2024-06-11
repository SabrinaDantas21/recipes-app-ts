import { AnyAction } from 'redux';
import { LOGIN_INITAL_STATE, SET_CREDENTIALS } from '../../util/typos';

const loginReducer = (state = LOGIN_INITAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case SET_CREDENTIALS:
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
      };
    default:
      return state;
  }
};

export default loginReducer;
