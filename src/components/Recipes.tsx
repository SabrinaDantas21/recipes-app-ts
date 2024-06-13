import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { GlobalStoreType } from '../util/types';
import MenuRecipeCard from './MenuRecipeCard';

export default function Recipes() {
  const location = useLocation();
  const { meals, drinks } = useSelector((globalState: GlobalStoreType) => (
    globalState.allRecipesListReducer));

  const filteredRecipeList = () => {
    if (meals.length > 0) {
      return meals.slice(0, 12);
    } if (drinks.length > 0) {
      return drinks.slice(0, 12);
    }
    return [];
  };

  return (
    <div>
      { location.pathname === '/meals' && filteredRecipeList()
        .map(({ strMeal, strMealThumb, idMeal }, index) => (
          <MenuRecipeCard
            key={ idMeal }
            image={ strMealThumb as string }
            recipeName={ strMeal as string }
            index={ index }
          />
        ))}
      { location.pathname === '/drinks' && filteredRecipeList()
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
