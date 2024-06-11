type APIRequestInfo = {
  ingredient?: boolean
  name?: boolean
  firstLetter?: boolean
  searchBar: string
  navigate: any
};

const verifyLength = (consumable: 'drink' | 'meal', data:any, navigate:any) => {
  if (consumable === 'drink' && data.length === 1) {
    return navigate(`/drinks/${data.idDrink}`);
  }

  if (consumable === 'meal' && data.length === 1) {
    return navigate(`/meals/${data.idMeal}`);
  }

  if (data.length === 0) {
    return window.alert('Sorry, we haven\'t found any recipes for these filters');
  }
};

export const getMealByFilter = async ({
  ingredient = false,
  name = false,
  firstLetter = false,
  searchBar,
  navigate,
}: APIRequestInfo) => {
  if (ingredient) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchBar}`);
    const data = await response.json();
    return verifyLength('meal', data, navigate);
  }

  if (name) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchBar}`);
    const data = await response.json();
    return verifyLength('meal', data, navigate);
  }

  if (firstLetter && searchBar.length > 1) {
    return window.alert('Your search must have only 1 (one) character');
  }

  if (firstLetter) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchBar}`);
    const data = await response.json();
    return verifyLength('meal', data, navigate);
  }
};

export const getDrinksByFilter = async ({
  ingredient = false,
  name = false,
  firstLetter = false,
  searchBar,
  navigate,
}: APIRequestInfo) => {
  if (ingredient) {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchBar}`);
    const data = await response.json();
    return verifyLength('drink', data, navigate);
  }

  if (name) {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchBar}`);
    const data = await response.json();
    return verifyLength('drink', data, navigate);
  }

  if (firstLetter && searchBar.length > 1) {
    return window.alert('Your search must have only 1 (one) character');
  }

  if (firstLetter) {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchBar}`);
    const data = await response.json();
    return verifyLength('drink', data, navigate);
  }
};
