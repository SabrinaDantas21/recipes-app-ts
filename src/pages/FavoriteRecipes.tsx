import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/actions';
import Header from '../components/Header/Header';
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
      return setFavoriteRecipes(JSON.parse(recipes));
    }
  };

  const handleFavoriteBtn = (itemId: string) => {
    const prevFavoriteList = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

    const checkList = prevFavoriteList
      .find((item: FavoriteRecipesType) => item.id === itemId);

    const removedRecipe = prevFavoriteList
      .filter((item: FavoriteRecipesType) => item.id !== itemId);

    if (checkList) {
      setFavoriteRecipes(removedRecipe);
      localStorage.setItem('favoriteRecipes', JSON.stringify(removedRecipe));
    }
  };

  const handleClick = (filter: string) => {
    const filtredRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

    const data = filtredRecipes.filter((recipe: any) => recipe.type === filter);
    console.log(data);

    return setFavoriteRecipes(data);
  };

  useEffect(() => {
    console.log('entrou');

    dispatch(setPage({
      title: 'Favorite Recipes',
      showSearchIcon: false,
    }));
    getFavoriteRecipes();
  }, []);

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
