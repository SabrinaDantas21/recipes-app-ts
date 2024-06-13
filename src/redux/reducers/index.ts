import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import pageReducer from './pageReducer';
import allRecipesListReducer from './allRecipesListReducer';

const rootReducer = combineReducers({
  loginReducer,
  pageReducer,
  allRecipesListReducer,
});

export default rootReducer;
