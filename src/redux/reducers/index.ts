import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import pageReducer from './pageReducer';
import allRecipesListReducer from './allRecipesListReducer';
import detailedRecipeReducer from './detailedRecipeReducer';
import updateRecipeInProgressReducer from './updateRecipeInProgress';

const rootReducer = combineReducers({
  loginReducer,
  pageReducer,
  allRecipesListReducer,
  detailedRecipeReducer,
  updateRecipeInProgressReducer,
});

export default rootReducer;
