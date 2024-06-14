import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { DispatchType, GlobalStoreType } from '../util/types';
import { setDetailedRecipe } from '../redux/actions';
import './Button.css';
import ConditionBtn from './ConditionBtn';

export default function RecipeDetails() {
  const location = useLocation();
  const [isMeal, setIsMeal] = useState(false);
  const dispatch: DispatchType = useDispatch();
  const recipe = useSelector(
    (state: GlobalStoreType) => state.detailedRecipeReducer.recipe,
  );

  const { id } = useParams<{ id: string }>();
  const type = isMeal ? 'meals' : 'drinks';

  useEffect(() => {
    if (location.pathname.includes('meals')) {
      dispatch(setDetailedRecipe(id as string, 'meals'));
      setIsMeal(true);
    } else if (location.pathname.includes('drinks')) {
      dispatch(setDetailedRecipe(id as string, 'drinks'));
    }
  }, [dispatch, id, location.pathname]);

  if (!recipe) {
    return <p>Carregando detalhes da receita...</p>;
  }

  return (
    <>
      <img
        src={ recipe.strMealThumb ?? recipe.strDrinkThumb ?? '' }
        alt="recipe"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h1>
      <h3>
        Category
        <p data-testid="recipe-category">
          {recipe.strCategory}
        </p>
      </h3>
      {isMeal ? (
        <div>
          <iframe
            width="560"
            height="315"
            src={ `https://www.youtube.com/embed/${recipe.strYoutube ? recipe.strYoutube.split('=')[1] : ''}` }
            title="YouTube video player"
            data-testid="video"
          />
        </div>
      ) : (
        <h3>
          <p data-testid="recipe-category">
            {recipe.strAlcoholic}
          </p>
        </h3>
      )}
      <h3>Ingredients</h3>
      <ul>
        {Object.keys(recipe).filter((key) => key.includes('Ingredient') && recipe[key])
          .map((ingredient, index) => (
            <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              {recipe[ingredient]}
              {' '}
              -
              {recipe[`strMeasure${ingredient.match(/\d+/)}`]}
            </li>
          ))}
      </ul>
      <h3>Instructions</h3>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <ConditionBtn type={ type } id={ id } />
    </>
  );
}
