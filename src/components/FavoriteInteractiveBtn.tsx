import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import isFavoriteBtn from '../images/blackHeartIcon.svg';
import Button from './Button';
import { FavoriteRecipesType, GlobalStoreType } from '../util/types';

function FavoriteInteractivesBtn() {
  const { id } = useParams<{ id: string }>();
  const [preveFavorite, setPrevFavorite] = useState();

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
    const usedRecipe = pathname.includes('in-progress')
      ? { ...recipeInProg }
      : { ...recipe };
    const idRecipe = usedRecipe.idMeal || usedRecipe.idDrink;

    const removedRecipe = prevFavoriteList
      .filter((item: FavoriteRecipesType) => item.id !== idRecipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removedRecipe));

    setIsFavorite(false);
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
      <Button
        dataTestid="favorite-btn"
        onClick={ handleFavoriteBtn }
        src={ isFavoriteBtn }
      />
    </div>
  );
}
export default FavoriteInteractivesBtn;
