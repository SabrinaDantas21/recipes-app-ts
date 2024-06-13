import { Dispatch, SetStateAction } from 'react';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type SetCredentialsPayloadType = {
  email: string;
  password: string;
};

export type SetPagePayloadType = {
  title: string;
  showSearchIcon: boolean;
};

export type SearchBarInfoType = {
  radioBtnValue: string
  searchBarValue: string
};

export type APIRequestInfo = {
  searchBarInfo: SearchBarInfoType
};

export type SelectedPage = {
  page?: 'meals' | 'drinks'
};

export type MealObjectType = {
  [key: string]: string | null;
};

export type DrinkObjectType = {
  [key: string]: string | null;
};

export type GlobalStoreType = {
  loginReducer: SetCredentialsPayloadType;
  pageReducer: SetPagePayloadType;
  allRecipesListReducer: {
    meals: MealObjectType[];
    drinks: DrinkObjectType[];
  }
};

export type MenuRecipeCardPropsType = {
  id: string;
  image: string;
  recipeName: string;
  index: number;
};

export type SingleFilterType = {
  strCategory: string
};

export type FilterButtonsType = {
  page: 'drinks' | 'meals'
  setActiveFilter: Dispatch<SetStateAction<string>>
  activeFilter: string
};

export type ButtonType = {
  type?: 'button' | 'reset' | 'submit' | undefined
  dataTestid?: string
  dataTestidBtn?: string
  onClick?: () => void
  src?: string
  alt?: string
  disabled?: boolean
  text?: string
};

// -----------Tipagem do Thunk -----------

export type DispatchType = ThunkDispatch<GlobalStoreType, unknown, AnyAction>;
