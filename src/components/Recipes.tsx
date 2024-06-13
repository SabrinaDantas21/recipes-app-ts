import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { GlobalStoreType } from '../util/types';
import MenuRecipeCard from './MenuRecipeCard';

export default function Recipes() {
  const location = useLocation();
  const { meals, drinks } = useSelector((globalState: GlobalStoreType) => (
    globalState.allRecipesListReducer));

  const filteredRecipeList = () => {
    if (location.pathname === '/meals') {
      return meals.slice(0, 12);
    } if (location.pathname === '/drinks') {
      return drinks.slice(0, 12);
    }
    return [];
  };

  return (
    <div>
      { meals.length > 0 && filteredRecipeList()
        .map(({ strMeal, strMealThumb, idMeal }, index) => (
          <MenuRecipeCard
            key={ idMeal }
            image={ strMealThumb as string }
            recipeName={ strMeal as string }
            index={ index }
          />
        ))}
      { drinks.length > 0 && filteredRecipeList()
        .map(({ strDrink, strDrinkThumb, idDrink }, index) => (
          <MenuRecipeCard
            key={ idDrink }
            image={ strDrinkThumb as string }
            recipeName={ strDrink as string }
            index={ index }
          />
        ))}
    </div>
  );
}
