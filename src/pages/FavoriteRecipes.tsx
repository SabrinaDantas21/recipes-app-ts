import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/actions';
import Header from '../components/Header';
import Button from '../components/Button';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import { FavoriteRecipesType, FinishedRecipes } from '../util/types';
import FavoriteCard from '../components/FavoriteCard';

function FavoriteRecipes() {
  const dispatch = useDispatch();
  const [favoriteRecipes, setFavoriteRecipes] = useState<FinishedRecipes[]>();

  const getFavoriteRecipes = () => {
    const recipes = localStorage.getItem('favoriteRecipes');
    if (recipes) {
      setFavoriteRecipes(JSON.parse(recipes));
    }
  };

  const handleFavoriteBtn = (itemId: string) => {
    const prevFavoriteList = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

    const checkList = prevFavoriteList
      .find((item: FavoriteRecipesType) => item.id === itemId);

    const removedRecipe = prevFavoriteList
      .filter((item: FavoriteRecipesType) => item.id !== itemId);

    if (checkList) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(removedRecipe));
    }
  };

  const handleClick = (filter: string) => {
    if (filter !== '') {
      const filtredRecipes = favoriteRecipes?.filter((recipe) => recipe.type === filter);
      return setFavoriteRecipes(filtredRecipes);
    }
    return favoriteRecipes;
  };

  useEffect(() => {
    dispatch(setPage({
      title: 'Favorite Recipes',
      showSearchIcon: false,
    }));
    getFavoriteRecipes();
  }, [handleFavoriteBtn, handleClick]);

  return (
    <>
      <Header />
      <main>
        <Button
          onClick={ () => getFavoriteRecipes() }
          dataTestidBtn="filter-by-all-btn"
        >
          All
        </Button>
        <Button
          src={ mealIcon }
          onClick={ () => handleClick('meal') }
          dataTestidBtn="filter-by-meal-btn"
        >
          Meals
        </Button>
        <Button
          src={ drinkIcon }
          onClick={ () => handleClick('drink') }
          dataTestidBtn="filter-by-drink-btn"
        >
          Drinks
        </Button>
        { favoriteRecipes && favoriteRecipes?.map((recipe, index) => {
          const idRecipe = recipe.id;
          const key = recipe.name;
          const img = recipe.image;
          const title = recipe.name;
          const type = recipe?.type;
          const category = recipe.alcoholicOrNot.includes('Alcoholic')
            ? `${recipe.category} - ${recipe.alcoholicOrNot}`
            : `${recipe.nationality} - ${recipe.category}`;
          return (
            <FavoriteCard
              id={ idRecipe }
              type={ type }
              category={ category }
              key={ key }
              index={ index }
              img={ img }
              title={ title }
              remove={ handleFavoriteBtn }
            />
          );
        })}
      </main>
    </>
  );
}

export default FavoriteRecipes;
