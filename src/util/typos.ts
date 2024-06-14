import { DrinkObjectType, MealObjectType } from './types';

export const SET_CREDENTIALS = 'SET_CREDENTIALS';
export const SET_PAGE = 'SET_PAGE';
export const SET_MEALS_LIST = 'SET_ALL_MEALS_LIST';
export const SET_DRINKS_LIST = 'SET_ALL_DRINKS_LIST';
export const SET_DETAILED_RECIPE = 'SET_DETAILED_RECIPE';

export const LOGIN_INITAL_STATE = {
  email: '',
  password: '',
};

export const INITIAL_PAGE_STATE = {
  title: '',
  showSearchIcon: false,
};

export const INITIAL_RECIPES_LIST_STATE = {
  meals: <MealObjectType[]>[],
  drinks: <DrinkObjectType[]>[],
};

export const INITIAL_DETAILED_RECIPE_STATE = {
  recipe: <MealObjectType>{},
};
