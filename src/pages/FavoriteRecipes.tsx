import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/actions';
import Header from '../components/Header';
import Button from '../components/Button';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function FavoriteRecipes() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage({
      title: 'Favorite Recipes',
      showSearchIcon: false,
    }));
  });

  return (
    <>
      <Header />
      <div>
        <Button
          data-testid="filter-by-all-btn"
        >
          All
        </Button>
        <Button
          data-testid="filter-by-meal-btn"
        >
          <img src={ mealIcon } alt="" />
          Meals
        </Button>
        <Button
          data-testid="filter-by-drink-btn"
        >
          <img src={ drinkIcon } alt="" />
          Drinks
        </Button>
      </div>
    </>
  );
}

export default FavoriteRecipes;
