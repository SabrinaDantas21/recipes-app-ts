import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { DispatchType, GlobalStoreType } from '../util/types';
import IngredientCheckbox from '../components/IngredientCheckbox';
import { initializeRecipeInProgress } from '../redux/actions';
import DetailsInteractiveBtns from '../components/DetailsInteractiveBtns';
import ConditionBtn from '../components/ConditionBtn';

export default function RecipeInProgress() {
  const dispatch: DispatchType = useDispatch();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const { recipe } = useSelector(
    (state: GlobalStoreType) => state.updateRecipeInProgressReducer,
  );

  useEffect(() => {
    if (location.pathname.includes('meals')) {
      dispatch(initializeRecipeInProgress(id as string, 'meals'));
    } else if (location.pathname.includes('drinks')) {
      dispatch(initializeRecipeInProgress(id as string, 'drinks'));
    }
  }, [dispatch, id, location.pathname]);

  const ingredientsList = Object.keys(recipe)
    .filter((key) => key.includes('Ingredient') && recipe[key]);

  return (
    <>
      <img
        src={ recipe.strMealThumb ?? recipe.strDrinkThumb ?? '' }
        alt="recipe"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h1>

      <DetailsInteractiveBtns />

      <h3>
        Category
        <p data-testid="recipe-category">
          {recipe.strCategory}
        </p>
      </h3>
      {location.pathname.includes('meal') ? (
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
        { ingredientsList.map((ingredient, index) => (
          <IngredientCheckbox
            key={ index }
            recipe={ recipe }
            ingredient={ ingredient }
            index={ index }
          />
        ))}
      </ul>
      <h3>Instructions</h3>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <ConditionBtn
        type={ location.pathname.includes('meals') ? 'meals' : 'drinks' }
        id={ id }
      />
    </>
  );
}
