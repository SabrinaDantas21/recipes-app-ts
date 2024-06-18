import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/actions';
import Header from '../components/Header';
import Button from '../components/Button';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import RecipeCard from '../components/RecipeCard';

function DoneRecipes() {
  const dispatch = useDispatch();
  const [finishedMealsRecipes, setFinishedMealsRecipes] = useState<object>([]);
  const [finishedDrinksRecipes, setFinishedDrinksRecipes] = useState<object>([]);

  useEffect(() => {
    dispatch(setPage({
      title: 'Done Recipes',
      showSearchIcon: false,
    }));
    const recipes = localStorage.getItem('doneRecipes');
    const data = [];
    if (recipes) {
      data.push(JSON.parse(recipes));
    }
    setFinishedMealsRecipes(data[0].meals);
    setFinishedDrinksRecipes(data[0].drinks);
  }, []);

  return (
    <>
      <Header />
      <Button dataTestidBtn="filter-by-all-btn"> All</Button>
      <Button dataTestidBtn="filter-by-meal-btn" src={ mealIcon } />
      <Button dataTestidBtn="filter-by-drink-btn" src={ drinkIcon } />
      { finishedMealsRecipes.map((recipe, index) => {
        const done = true;
        const key = recipe.idMeal || recipe.idDrink;
        const img = recipe.strMealThumb || recipe.strDrinkThumb;
        const title = recipe.strMeal || recipe.strDrink;
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
      { finishedDrinksRecipes.map((recipe, index) => {
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
