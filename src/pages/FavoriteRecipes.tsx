import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/actions';
import Header from '../components/Header';
import Button from '../components/Button';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import { FinishedRecipes } from '../util/types';
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

  useEffect(() => {
    dispatch(setPage({
      title: 'Favorite Recipes',
      showSearchIcon: false,
    }));
    getFavoriteRecipes();
  }, []);

  const handleClick = (filter: string) => {
    if (filter !== '') {
      const filtredRecipes = favoriteRecipes?.filter((recipe) => recipe.type === filter);
      return setFavoriteRecipes(filtredRecipes);
    }
    return favoriteRecipes;
  };

  return (
    <>
      <Header />
      <main>
        <Button
          data-testid="filter-by-all-btn"
          onClick={ () => getFavoriteRecipes() }
        >
          All
        </Button>
        <Button
          data-testid="filter-by-meal-btn"
          src={ mealIcon }
          onClick={ () => handleClick('meal') }
        >
          Meals
        </Button>
        <Button
          data-testid="filter-by-drink-btn"
          src={ drinkIcon }
          onClick={ () => handleClick('drink') }
        >
          Drinks
        </Button>
        { favoriteRecipes && favoriteRecipes?.map((recipe, index) => {
          const idRecipe = recipe.id;
          const tags = recipe?.tags;
          const done = true;
          const key = recipe.name;
          const img = recipe.image;
          const title = recipe.name;
          const type = recipe?.type;
          const category = recipe.alcoholicOrNot.includes('Alcoholic')
            ? `${recipe.category} - ${recipe.alcoholicOrNot}`
            : `${recipe.nationality} - ${recipe.category}`;
          const date = recipe.doneDate;
          return (
            <FavoriteCard
              id={ idRecipe }
              type={ type }
              tags={ tags }
              category={ category }
              done={ done }
              date={ date }
              key={ key }
              index={ index }
              img={ img }
              title={ title }
            />
          );
        })}
      </main>
    </>
  );
}

export default FavoriteRecipes;
