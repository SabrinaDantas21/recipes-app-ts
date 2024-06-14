import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DispatchType, DoneRecipeType, GlobalStoreType } from '../util/types';
import { setDetailedRecipe } from '../redux/actions';
import Button from './Button';
import './Button.css';

export default function RecipeDetails() {
  const location = useLocation();
  const [isMeal, setIsMeal] = useState(false);
  const dispatch: DispatchType = useDispatch();
  const recipe = useSelector(
    (state: GlobalStoreType) => state.detailedRecipeReducer.recipe,
  );
  const navigate = useNavigate();
  const [isRecipeDone, setIsRecipeDone] = useState(false);
  const [btnName, setBtnName] = useState('Start');

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

  const addToInProgressRecipes = () => {
    const inProgressRecipesLs = localStorage.getItem('inProgressRecipes');
    const inProgressRecipes = inProgressRecipesLs
      ? JSON.parse(inProgressRecipesLs) : { meals: {}, drinks: {} };

    const updatedInProgressRecipes = {
      ...inProgressRecipes,
      [type]: {
        ...inProgressRecipes[type],
        [id as string]: Object.keys(recipe).filter((key) => key
          .includes('strIngredient') && recipe[key]),
      },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(updatedInProgressRecipes));
  };

  useEffect(() => {
    const doneRecipesLs = localStorage.getItem('doneRecipes');
    const inProgressRecipesLs = localStorage.getItem('inProgressRecipes');
    if (doneRecipesLs) {
      const doneRecipes = JSON.parse(doneRecipesLs);

      const LsRecipes = doneRecipes
        .some((doneRecipe: DoneRecipeType) => doneRecipe.id === id);
      setIsRecipeDone(LsRecipes);
    }

    if (inProgressRecipesLs) {
      const recipeStatus = JSON.parse(inProgressRecipesLs);
      const isStarted = id as string in recipeStatus;

      if (isStarted) {
        setBtnName('Continue');
      }
    }
  }, [id, type]);

  const handleClick = () => {
    addToInProgressRecipes();
    if (type === 'meals') {
      navigate(`/meals/${id}/in-progress/`);
    } else {
      navigate(`/drinks/${id}/in-progress/`);
    }
  };

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
      {!isRecipeDone && (
        <Button
          className="fixed-btn"
          dataTestidBtn="start-recipe-btn"
          onClick={ handleClick }
        >
          {btnName}
          {' '}
          Recipe
        </Button>
      )}
    </>
  );
}
