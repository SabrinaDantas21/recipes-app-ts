import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/actions';
import Header from '../components/Header';
import Button from '../components/Button';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import RecipeCard from '../components/RecipeCard';
import { FinishedRecipes } from '../util/types';

function DoneRecipes() {
  const dispatch = useDispatch();
  const [finishedRecipes,
    setFinishedRecipes] = useState<FinishedRecipes[]>();

  const getFinishedRecipes = () => {
    const recipes = localStorage.getItem('doneRecipes');
    if (recipes) {
      setFinishedRecipes(JSON.parse(recipes));
    }
  };
  useEffect(() => {
    dispatch(setPage({
      title: 'Done Recipes',
      showSearchIcon: false,
    }));
    getFinishedRecipes();
  }, []);

  return (
    <>
      <Header />
      <Button dataTestidBtn="filter-by-all-btn"> All</Button>
      <Button dataTestidBtn="filter-by-meal-btn" src={ mealIcon } />
      <Button dataTestidBtn="filter-by-drink-btn" src={ drinkIcon } />
      { finishedRecipes !== undefined && finishedRecipes.map((recipe, index) => {
        const tags = recipe?.tags;
        const done = true;
        const key = recipe.name;
        const img = recipe.image;
        const title = recipe.name;
        const category = `${recipe.nationality} - ${recipe.category}`;
        const date = recipe.doneDate;
        return (
          <RecipeCard
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
    </>
  );
}

export default DoneRecipes;
