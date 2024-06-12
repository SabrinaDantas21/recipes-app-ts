import { AnyAction } from 'redux';
import { INITIAL_PAGE_STATE, SET_PAGE } from '../../util/typos';

const pageReducer = (state = INITIAL_PAGE_STATE, action: AnyAction) => {
  switch (action.type) {
    case SET_PAGE:
      return {
        ...state,
        title: action.payload.title,
        showSearchIcon: action.payload.showSearchIcon,
      };
    default:
      return state;
  }
};

export default pageReducer;
