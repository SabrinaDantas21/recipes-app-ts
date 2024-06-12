import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import pageReducer from './pageReducer';

const rootReducer = combineReducers({
  loginReducer,
  pageReducer,
});

export default rootReducer;
