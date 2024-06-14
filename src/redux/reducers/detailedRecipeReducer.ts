import { AnyAction } from 'redux';
import {
  INITIAL_DETAILED_RECIPE_STATE,
  SET_DETAILED_RECIPE,
} from '../../util/typos';

const detailedRecipeReducer = (
  state = INITIAL_DETAILED_RECIPE_STATE,
  action: AnyAction,
) => {
  switch (action.type) {
    case SET_DETAILED_RECIPE:
      return {
        ...state,
        recipe: action.payload,
      };
    default:
      return state;
  }
};

export default detailedRecipeReducer;
