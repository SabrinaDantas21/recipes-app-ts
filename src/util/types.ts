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

export type ApiDataType = {
  meals?: MealObjectType[]
  drinks?: DrinkObjectType[]
};

export type GlobalStoreType = {
  loginReducer: SetCredentialsPayloadType;
  pageReducer: SetPagePayloadType;
  allRecipesListReducer: {
    meals: MealObjectType[];
    drinks: DrinkObjectType[];
  },
  detailedRecipeReducer: {
    recipe: MealObjectType;
  },
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

export type MealRecommendationType = {
  idMeal: string,
  strArea: string,
  strCategory: string,
  strIngredient1: string,
  strIngredient2: string,
  strIngredient3: string,
  strIngredient4: string,
  strIngredient5: string,
  strIngredient6: string,
  strIngredient7: string,
  strIngredient8: string,
  strIngredient9: string,
  strIngredient10: string,
  strIngredient11: string,
  strIngredient12: string,
  strIngredient13: string,
  strIngredient14: string,
  strIngredient15: string,
  strIngredient16: string,
  strIngredient17: string,
  strIngredient18: string,
  strIngredient19: string,
  strIngredient20: string,
  strInstructions: string,
  strMeal: string,
  strMealThumb: string,
  strMeasure1: string,
  strMeasure2: string,
  strMeasure3: string,
  strMeasure4: string,
  strMeasure5: string,
  strMeasure6: string,
  strMeasure7: string,
  strMeasure8: string,
  strMeasure9: string,
  strMeasure10: string,
  strMeasure11: string,
  strMeasure12: string,
  strMeasure13: string,
  strMeasure14: string,
  strMeasure15: string,
  strMeasure16: string,
  strMeasure17: string,
  strMeasure18: string,
  strMeasure19: string,
  strMeasure20: string,
  strSource: string,
  strTags: string,
  strYoutube: string,
};

export type DrinkRecommendationType = {
  idDrink: string,
  strAlcoholic: string,
  strCategory: string,
  strDrink: string,
  strDrinkThumb: string,
  strGlass: string,
  strIngredient1: string,
  strIngredient2: string,
  strIngredient3: string,
  strIngredient4: string,
  strIngredient5: string,
  strIngredient6: string,
  strIngredient7: string,
  strIngredient8: string,
  strIngredient9: string,
  strIngredient10: string,
  strIngredient11: string,
  strIngredient12: string,
  strIngredient13: string,
  strIngredient14: string,
  strIngredient15: string,
  strInstructions: string,
  strMeasure1: string,
  strMeasure2: string,
  strMeasure3: string,
  strMeasure4: string
  strMeasure5: string,
  strMeasure6: string,
  strMeasure7: string,
  strMeasure8: string,
  strMeasure9: string,
  strMeasure10: string,
  strMeasure11: string,
  strMeasure12: string,
  strMeasure13: string,
  strMeasure14: string,
  strMeasure15: string,
};

export type CardPropType = {
  index: number,
  isVisible?: boolean,
  done: boolean,
  category?: string,
  date?: string,
  key: string,
  img: string,
  title: string,
};
export type AllRecipesListType = {
  meals: MealRecommendationType,
  drinks: DrinkObjectType,
};

export type ButtonType = {
  children?: React.ReactNode
  type?: 'button' | 'reset' | 'submit' | undefined
  dataTestid?: string
  dataTestidBtn?: string
  onClick?: () => void
  src?: string
  alt?: string
  disabled?: boolean
  text?: string
  className?: string
};

export type DoneRecipeType = {
  drinks: object,
  meals: object,
};

export type ConditionButtonType = {
  type: string;
  id?: string;
};

export type FavoriteRecipesType = {
  id: string
  type: string
  nationality: string
  category: string
  alcoholicOrNot: string
  name: string
  image: string
};

// -----------Tipagem do Thunk ----------- //
export type DispatchType = ThunkDispatch<GlobalStoreType, unknown, AnyAction>;
