import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { GlobalStoreType } from '../util/types';
import MenuRecipeCard from './MenuRecipeCard';
import FilterButtons from './FilterButtons/FilterButtons';

export default function Recipes() {
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState('');
  const { meals, drinks } = useSelector((globalState: GlobalStoreType) => (
    globalState.allRecipesListReducer));

  const filteredRecipeList = () => {
    // Aqui vão as aplicações de filtros, edite conforme precisar
    if (meals.length > 0 && location.pathname === '/meals') {
      return meals.slice(0, 12);
    } if (drinks.length > 0 && location.pathname === '/drinks') {
      return drinks.slice(0, 12);
    }
    return [];
  };

  return (
    <>
      <div>
        { location.pathname === '/meals'
          ? <FilterButtons
              page="meals"
              activeFilter={ activeFilter }
              setActiveFilter={ setActiveFilter }
          /> : <FilterButtons
            page="drinks"
            activeFilter={ activeFilter }
            setActiveFilter={ setActiveFilter }
          />}
      </div>
      <div className="cards-container">
        { location.pathname === '/meals' && filteredRecipeList()
          .map(({ strMeal, strMealThumb, idMeal }, index) => (
            <MenuRecipeCard
              key={ idMeal }
              id={ idMeal as string }
              image={ strMealThumb as string }
              recipeName={ strMeal as string }
              index={ index }
            />
          ))}
        { location.pathname === '/drinks' && filteredRecipeList()
          .map(({ strDrink, strDrinkThumb, idDrink }, index) => (
            <MenuRecipeCard
              key={ idDrink }
              id={ idDrink as string }
              image={ strDrinkThumb as string }
              recipeName={ strDrink as string }
              index={ index }
            />
          ))}
      </div>
    </>
  );
}
