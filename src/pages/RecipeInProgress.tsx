import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Button from '../components/Button';
import { GlobalStoreType } from '../util/types';

export default function RecipeInProgress() {
  const location = useLocation();
  const recipe = useSelector(
    (state: GlobalStoreType) => state.detailedRecipeReducer.recipe,
  );

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
      <Button
        className="fixed-btn"
        dataTestidBtn="start-recipe-btn"
      >
        Finish Recipe
      </Button>
    </>
  );
}
