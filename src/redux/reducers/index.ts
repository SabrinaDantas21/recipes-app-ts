import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import pageReducer from './pageReducer';
import allRecipesListReducer from './allRecipesListReducer';
import detailedRecipeReducer from './detailedRecipeReducer';

const rootReducer = combineReducers({
  loginReducer,
  pageReducer,
  allRecipesListReducer,
  detailedRecipeReducer,
});

export default rootReducer;
