import {
  SET_CREDENTIALS,
  SET_DRINKS_LIST,
  SET_MEALS_LIST,
  SET_PAGE,
} from '../../util/typos';
import {
  DispatchType,
  MealObjectType,
  SetCredentialsPayloadType,
  SetPagePayloadType,
} from '../../util/types';
import {
  getDrinksByFilter,
  getDrinksFilteredListByCategory,
  getMealByFilter,
  getMealsFilteredListByCategory } from '../../services/api';

export const setCredentials = ({ email, password }: SetCredentialsPayloadType) => ({
  type: SET_CREDENTIALS,
  payload: {
    email,
    password,
  },
});

export const setPage = (page: SetPagePayloadType) => ({
  type: SET_PAGE,
  payload: page,
});

export const setMealsListAction = (data: MealObjectType[]) => ({
  type: SET_MEALS_LIST,
  payload: data,
});

export const setAllMealsList = (category = '') => {
  const currentInfo = {
    searchBarInfo: { searchBarValue: '', radioBtnValue: 'name-radio' },
  };
  return async (dispatch: DispatchType) => {
    try {
      if (category !== '') {
        const data = await getMealsFilteredListByCategory(category);
        dispatch(setMealsListAction(data.meals));
      } else {
        const data = await getMealByFilter(currentInfo);
        dispatch(setMealsListAction(data.meals));
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
};

export const setDrinksListAction = (data: MealObjectType[]) => ({
  type: SET_DRINKS_LIST,
  payload: data,
});

export const setAllDrinksList = (category = '') => {
  const currentInfo = {
    searchBarInfo: { searchBarValue: '', radioBtnValue: 'name-radio' },
  };
  return async (dispatch: DispatchType) => {
    try {
      if (category !== '') {
        const data = await getDrinksFilteredListByCategory(category);
        dispatch(setDrinksListAction(data.drinks));
      } else {
        const data = await getDrinksByFilter(currentInfo);
        dispatch(setDrinksListAction(data.drinks));
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
};
