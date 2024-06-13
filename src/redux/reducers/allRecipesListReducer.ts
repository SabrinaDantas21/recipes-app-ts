import { AnyAction } from 'redux';
import {
  INITIAL_RECIPES_LIST_STATE,
  SET_DRINKS_LIST,
  SET_MEALS_LIST,
} from '../../util/typos';

const allRecipesListReducer = (state = INITIAL_RECIPES_LIST_STATE, action: AnyAction) => {
  switch (action.type) {
    case SET_MEALS_LIST:
      return {
        ...state,
        meals: action.payload,
      };
    case SET_DRINKS_LIST:
      return {
        ...state,
        drinks: action.payload,
      };
    default:
      return state;
  }
};

export default allRecipesListReducer;
