import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/actions';
import Header from '../components/Header';
import Button from '../components/Button';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import RecipeCard from '../components/RecipeCard';
import { DrinkRecommendationType, MealRecommendationType } from '../util/types';

function DoneRecipes() {
  const dispatch = useDispatch();
  const [finishedMealsRecipes,
    setFinishedMealsRecipes] = useState<MealRecommendationType[]>([]);
  const [finishedDrinksRecipes,
    setFinishedDrinksRecipes] = useState<DrinkRecommendationType[]>([]);
  const recipes = localStorage.getItem('doneRecipes');
  const data = [];
  if (recipes) {
    data.push(JSON.parse(recipes));
    setFinishedMealsRecipes(data[0].meals);
    setFinishedDrinksRecipes(data[0].drinks);
  }
  useEffect(() => {
    dispatch(setPage({
      title: 'Done Recipes',
      showSearchIcon: false,
    }));
  }, []);

  return (
    <>
      <Header />
      <Button dataTestidBtn="filter-by-all-btn"> All</Button>
      <Button dataTestidBtn="filter-by-meal-btn" src={ mealIcon } />
      <Button dataTestidBtn="filter-by-drink-btn" src={ drinkIcon } />
      { finishedMealsRecipes !== null && finishedMealsRecipes.map((recipe, index) => {
        const done = true;
        const key = recipe.idMeal;
        const img = recipe.strMealThumb;
        const title = recipe.strMeal;
        const category = `${recipe.strArea} - ${recipe.strCategory}`;
        const date = recipe.finishDate;
        return (
          <RecipeCard
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
      { finishedDrinksRecipes !== null && finishedDrinksRecipes.map((recipe, index) => {
        const done = true;
        const key = recipe.idDrink;
        const img = recipe.strDrinkThumb;
        const title = recipe.strDrink;
        const category = `${recipe.strCategory}`;
        const date = recipe.finishDate;
        return (
          <RecipeCard
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
