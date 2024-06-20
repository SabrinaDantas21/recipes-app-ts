import {
  SET_CREDENTIALS,
  SET_DETAILED_RECIPE,
  SET_DRINKS_LIST,
  SET_INGREDIENT_CHECKS,
  SET_MEALS_LIST,
  SET_PAGE,
  SET_RECIPE_IN_PROGRESS,
} from '../../util/typos';
import {
  DispatchType,
  IngredientChecksType,
  MealObjectType,
  SetCredentialsPayloadType,
  SetPagePayloadType,
} from '../../util/types';
import {
  getDrinksByFilter,
  getDrinksFilteredListByCategory,
  getMealByFilter,
  getMealsFilteredListByCategory,
  getSingleDrinkRecipe,
  getSingleMealRecipe } from '../../services/api';

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

export const setDetailedRecipeAction = (data: MealObjectType) => ({
  type: SET_DETAILED_RECIPE,
  payload: data,
});

export const setDetailedRecipe = (recipeId: string, page: string) => {
  return async (dispatch: DispatchType) => {
    try {
      if (page === 'meals') {
        const data = await getSingleMealRecipe(recipeId);
        dispatch(setDetailedRecipeAction(data.meals[0]));
      } else {
        const data = await getSingleDrinkRecipe(recipeId);
        dispatch(setDetailedRecipeAction(data.drinks[0]));
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
};

export const setRecipeInProgress = (
  recipe: MealObjectType,
) => ({
  type: SET_RECIPE_IN_PROGRESS,
  payload: recipe,
});

export const setIngredientChecks = (
  ingredientChecks: IngredientChecksType,
) => ({
  type: SET_INGREDIENT_CHECKS,
  payload: ingredientChecks,
});

export const initializeRecipeInProgress = (
  recipeId: string,
  page: string,
) => {
  return async (dispatch: DispatchType) => {
    try {
      let recipe: MealObjectType;
      if (page === 'meals') {
        const data = await getSingleMealRecipe(recipeId);
        recipe = { ...data.meals[0] };
      } else {
        const data = await getSingleDrinkRecipe(recipeId);
        recipe = { ...data.drinks[0] };
      }

      const inProgressRecipesLs = localStorage.getItem('inProgressRecipes');
      const inProgressRecipes = inProgressRecipesLs
        ? JSON.parse(inProgressRecipesLs) : { meals: {}, drinks: {} };

      const completedIngredients = recipeId && inProgressRecipes[page][recipeId];

      const initialIngredientsChecks = Object.keys(recipe)
        .filter((key) => key.includes('Ingredient') && recipe[key])
        .reduce((acc: IngredientChecksType, ingredient: string) => {
          if (!acc[ingredient]) acc = { ...acc, [ingredient]: false };
          return acc;
        }, {});

      const initialChecksWithLs = () => {
        Object.keys(initialIngredientsChecks).forEach((check, index) => {
          initialIngredientsChecks[check] = completedIngredients.includes(index);
        });
      };

      if (completedIngredients) initialChecksWithLs();

      dispatch(setRecipeInProgress(recipe));
      dispatch(setIngredientChecks(initialIngredientsChecks));
    } catch (error: any) {
      console.log(error.message);
    }
  };
};
