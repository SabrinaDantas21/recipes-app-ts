import { APIRequestInfo } from '../util/types';

const firstLetter = 'first-letter-radio';

export const getMealByFilter = async ({
  searchBarInfo,
}: APIRequestInfo) => {
  const { radioBtnValue, searchBarValue } = searchBarInfo;

  if (radioBtnValue === 'ingredient-radio') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchBarValue}`);
    const data = await response.json();
    return data;
  }

  if (radioBtnValue === 'name-radio') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchBarValue}`);
    const data = await response.json();
    return data;
  }

  if (radioBtnValue === firstLetter && searchBarValue.length > 1) {
    return window.alert('Your search must have only 1 (one) character');
  }

  if (radioBtnValue === firstLetter) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchBarValue}`);
    const data = await response.json();
    return data;
  }
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data;
};

export const getDrinksByFilter = async ({
  searchBarInfo,
}: APIRequestInfo) => {
  const { searchBarValue, radioBtnValue } = searchBarInfo;

  if (radioBtnValue === 'ingredient-radio') {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchBarValue}`);
    const data = await response.json();
    return data;
  }

  if (radioBtnValue === 'name-radio') {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchBarValue}`);
    const data = await response.json();
    return data;
  }

  if (radioBtnValue === firstLetter && searchBarValue.length > 1) {
    return window.alert('Your search must have only 1 (one) character');
  }

  if (radioBtnValue === firstLetter) {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchBarValue}`);
    const data = await response.json();
    return data;
  }
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data;
};

export const getFiltersList = async (page: 'meals' | 'drinks') => {
  if (page === 'meals') {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    return data;
  }

  if (page === 'drinks') {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    return data;
  }
};

export const getMealsFilteredListByCategory = async (category: string) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  return data;
};

export const getDrinksFilteredListByCategory = async (category: string) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  return data;
};

export const getSingleMealRecipe = async (id: string) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data;
};

export const getSingleDrinkRecipe = async (id: string) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data;
};

// logica carousel

export const getMainRecipesList = async (page: 'Meals' | 'Drinks') => {
  if (page === 'Meals') {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    return data;
  }

  if (page === 'Drinks') {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    return data;
  }
};
