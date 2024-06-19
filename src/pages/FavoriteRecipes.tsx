import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/actions';
import Header from '../components/Header';
import Button from '../components/Button';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import { FavoriteRecipesType } from '../util/types';
import { useNavigate } from 'react-router-dom';

function FavoriteRecipes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [copiedURL, setCopiedURL] = useState('');
  const [filteredRecipe, setFilteredRecipe] = useState<FavoriteRecipesType[]>(favoriteRecipes);

  useEffect(() => {
    dispatch(setPage({
      title: 'Favorite Recipes',
      showSearchIcon: false,
    }));
  });

  const filterRecipes = (value: 'meal' | 'drinks' | 'all') => {
    if (value === 'meal') {
      const meals = favoriteRecipes.filter((recipe: FavoriteRecipesType) => recipe.type === 'meal');
      setFilteredRecipe(meals);
    } else if (value === 'drinks') {
      const drinks = favoriteRecipes.filter((recipe: FavoriteRecipesType) => recipe.type === 'drink');
      setFilteredRecipe(drinks);
    } else {
      setFilteredRecipe(favoriteRecipes);
    }
  };

  const handleNavigate = (type: 'meals' | 'drinks', id: string) => {
    navigate(`/${type}/${id}`)
  };

  return (
    <>
      <Header />
      <main>
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
      </main>
    </>
  );
}

export default FavoriteRecipes;
