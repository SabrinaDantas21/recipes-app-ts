export const verifyLength = (consumable: 'drink' | 'meal', data:any, navigate:any) => {
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
