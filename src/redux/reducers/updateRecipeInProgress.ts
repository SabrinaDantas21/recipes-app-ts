import { AnyAction } from 'redux';
import {
  INITIAL_RECIPE_IN_PROGRESS_STATE,
  SET_INGREDIENT_CHECKS,
  SET_RECIPE_IN_PROGRESS,
} from '../../util/typos';

const updateRecipeInProgressReducer = (
  state = INITIAL_RECIPE_IN_PROGRESS_STATE,
  action: AnyAction,
) => {
  switch (action.type) {
    case SET_RECIPE_IN_PROGRESS:
      return {
        ...state,
        recipe: action.payload,
      };
    case SET_INGREDIENT_CHECKS:
      return {
        ...state,
        ingredientChecks: action.payload,
      };
    default:
      return state;
  }
};

export default updateRecipeInProgressReducer;
