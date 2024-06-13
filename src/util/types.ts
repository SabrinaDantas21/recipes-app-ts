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
  page: 'meals' | 'drinks'
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
  image: string;
  recipeName: string;
  index: number;
};

// -----------Tipagem do Thunk -----------
// ===== Editar quando adicionar alguma chave no estado =====

export type DispatchType = ThunkDispatch<GlobalStoreType, unknown, AnyAction>;
