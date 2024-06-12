import { NavigateFunction } from 'react-router-dom';

const firstLetter = 'first-letter-radio';

type SearchBarInfoType = {
  radioBtnValue: string
  searchBarValue: string
};

type APIRequestInfo = {
  searchBarInfo: SearchBarInfoType
  navigate: NavigateFunction
};

const verifyLength = (consumable: 'drink' | 'meal', data:any, navigate:any) => {
  if (consumable === 'drink' && data.drinks === null) {
    return window.alert('Sorry, we haven\'t found any recipes for these filters');
  }

  if (consumable === 'meal' && data.meals === null) {
    return window.alert('Sorry, we haven\'t found any recipes for these filters');
  }

  if (consumable === 'drink' && data.drinks.length === 1) {
    return navigate(`/drinks/${data.drinks[0].idDrink}`);
  }

  if (consumable === 'meal' && data.meals.length === 1) {
    return navigate(`/meals/${data.meals[0].idMeal}`);
  }

  return data;
};

export const getMealByFilter = async ({
  searchBarInfo,
  navigate,
}: APIRequestInfo) => {
  const { radioBtnValue, searchBarValue } = searchBarInfo;

  if (radioBtnValue === 'ingredient-radio') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchBarValue}`);
    const data = await response.json();
    return verifyLength('meal', data, navigate);
  }

  if (radioBtnValue === 'name-radio') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchBarValue}`);
    const data = await response.json();
    return verifyLength('meal', data, navigate);
  }

  if (radioBtnValue === firstLetter && searchBarValue.length > 1) {
    return window.alert('Your search must have only 1 (one) character');
  }

  if (radioBtnValue === firstLetter) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchBarValue}`);
    const data = await response.json();
    console.log(data);

    return verifyLength('meal', data, navigate);
  }
};

export const getDrinksByFilter = async ({
  searchBarInfo,
  navigate,
}: APIRequestInfo) => {
  const { searchBarValue, radioBtnValue } = searchBarInfo;

  if (radioBtnValue === 'ingredient-radio') {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchBarValue}`);
    const data = await response.json();
    return verifyLength('drink', data, navigate);
  }

  if (radioBtnValue === 'name-radio') {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchBarValue}`);
    const data = await response.json();
    return verifyLength('drink', data, navigate);
  }

  if (radioBtnValue === firstLetter && searchBarValue.length > 1) {
    return window.alert('Your search must have only 1 (one) character');
  }

  if (radioBtnValue === firstLetter) {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchBarValue}`);
    const data = await response.json();
    return verifyLength('drink', data, navigate);
  }
};
