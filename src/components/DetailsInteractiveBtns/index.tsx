import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import isntFavoriteBtn from '../../images/whiteHeartIcon.svg';
import isFavoriteBtn from '../../images/blackHeartIcon.svg';
import Button from '../Button/Button';
import { FavoriteRecipesType, GlobalStoreType, MealObjectType } from '../../util/types';

function DetailsInteractiveBtns() {
  const { id } = useParams<{ id: string }>();

  const { pathname } = useLocation();
  const [isFavorite, setIsFavorite] = useState(false);

  const recipe = useSelector(
    (state: GlobalStoreType) => state.detailedRecipeReducer.recipe,
  );

  const recipeInProg = useSelector(
    (state: GlobalStoreType) => state.updateRecipeInProgressReducer.recipe,
  );

  const handleFavoriteBtn = () => {
    const prevFavoriteList = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

    const usedRecipe: MealObjectType = pathname.includes('in-progress')
      ? { ...recipeInProg } : { ...recipe };

    const newRecipe = {
      id: usedRecipe.idMeal || usedRecipe.idDrink,
      type: usedRecipe.strMeal ? 'meal' : 'drink',
      nationality: usedRecipe.strArea || '',
      category: usedRecipe.strCategory,
      alcoholicOrNot: usedRecipe.strMeal ? '' : usedRecipe.strAlcoholic,
      name: usedRecipe.strMeal || usedRecipe.strDrink,
      image: usedRecipe.strMealThumb || usedRecipe.strDrinkThumb,
    };

    const checkdata = prevFavoriteList
      .find((item: FavoriteRecipesType) => item.id === id);

    const removedRecipe = prevFavoriteList
      .filter((item: FavoriteRecipesType) => item.id !== id);
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
        .find((item: FavoriteRecipesType) => item.id === id);

      if (checkList) {
        return setIsFavorite(true);
      }
    };

    checkIfIsFavorite();
  }, []);

  return (
    <div>
      {isFavorite ? (
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
