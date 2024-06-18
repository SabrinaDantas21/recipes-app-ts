import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import isntFavoriteBtn from '../images/whiteHeartIcon.svg';
import isFavoriteBtn from '../images/blackHeartIcon.svg';
import Button from './Button';
import { FavoriteRecipesType, GlobalStoreType } from '../util/types';

function DetailsInteractiveBtns() {
  const [isFavorite, setIsFavorite] = useState(false);
  const recipe = useSelector(
    (state: GlobalStoreType) => state.detailedRecipeReducer.recipe,
  );

  const handleFavoriteBtn = () => {
    const prevFavoriteList = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

    const newRecipe = {
      id: recipe.idMeal || recipe.idDrink,
      type: recipe.strMeal ? 'meal' : 'drink',
      nationality: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strMeal ? '' : recipe.strAlcoholic,
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
    };

    const checkdata = prevFavoriteList
      .find((item: FavoriteRecipesType) => item.id === newRecipe.id);

    const removedRecipe = prevFavoriteList
      .filter((item: FavoriteRecipesType) => item.id !== newRecipe.id);

    if (checkdata) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(removedRecipe));
      setIsFavorite(false);
    } else {
      const data = [...prevFavoriteList, newRecipe];
      localStorage.setItem('favoriteRecipes', JSON.stringify(data));
      setIsFavorite(true);
    }
  };

  useEffect(() => {
    const checkIfIsFavorite = () => {
      const favoritesList = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

      const checkList = favoritesList
        .find((item: FavoriteRecipesType) => item.id === recipe.idMeal || recipe.idDrink);

      if (checkList) {
        return setIsFavorite(true);
      }
    };

    checkIfIsFavorite();
  }, [handleFavoriteBtn]);

  return (
    <div>
      {isFavorite === true ? (
        <Button
          dataTestid="favorite-btn"
          onClick={ handleFavoriteBtn }
          src={ isFavoriteBtn }
        />
      ) : (
        <Button
          dataTestid="favorite-btn"
          onClick={ handleFavoriteBtn }
          src={ isntFavoriteBtn }
        />

      )}
    </div>
  );
}

export default DetailsInteractiveBtns;
