import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { DispatchType, GlobalStoreType } from '../../util/types';
import IngredientCheckbox from '../../components/IngredientCheckbox/IngredientCheckbox';
import { initializeRecipeInProgress } from '../../redux/actions';
import DetailsInteractiveBtns from '../../components/DetailsInteractiveBtns';
import Button from '../../components/Button/Button';
import ShareButton from '../../components/ShareButton/ShareButton';
import '../../components/ConditionBtn/ConditionBtn.css';
import '../RecipeDetails/RecipeDetails.css';

export default function RecipeInProgress() {
  const dispatch: DispatchType = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const formatedPath = location.pathname.slice(1, location.pathname.length - 12);

  const { recipe } = useSelector(
    (state: GlobalStoreType) => state.updateRecipeInProgressReducer,
  );
  const { ingredientChecks } = useSelector(
    (state: GlobalStoreType) => state.updateRecipeInProgressReducer,
  );

  const addToDoneRecipes = () => {
    const doneRecipesLs = localStorage.getItem('doneRecipes') || '[]';
    const doneRecipesObject = JSON.parse(doneRecipesLs);
    const newRecipeObject = {
      id: recipe.idMeal || recipe.idDrink,
      type: location.pathname.includes('/meals') ? 'meal' : 'drink',
      nationality: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
      tags: recipe.strTags?.split(',') || [],
      doneDate: new Date(),
    };
    localStorage
      .setItem('doneRecipes', JSON.stringify([...doneRecipesObject, newRecipeObject]));
  };

  useEffect(() => {
    if (location.pathname.includes('meals')) {
      dispatch(initializeRecipeInProgress(id as string, 'meals'));
    } else if (location.pathname.includes('drinks')) {
      dispatch(initializeRecipeInProgress(id as string, 'drinks'));
    }
  }, []);

  const ingredientsList = Object.keys(recipe)
    .filter((key) => key.includes('Ingredient') && recipe[key]);

  const handleClick = () => {
    addToDoneRecipes();
    navigate('/done-recipes');
  };

  /*
      <div className="main-container">
        <img
          src={ recipe.strMealThumb ?? recipe.strDrinkThumb ?? '' }
          alt="recipe"
          data-testid="recipe-photo"
        />
        <h1 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h1>

        <DetailsInteractiveBtns />
        <ShareButton dataTestidBtn="share-btn" url={ `http://localhost:3000/${formatedPath}` } />
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

        <Button
          dataTestidBtn="finish-recipe-btn"
          disabled={ !Object.values(ingredientChecks).every((check) => check === true) }
          onClick={ handleClick }
        >
          Finish recipe
        </Button>
      </div>
     */
  return (
    <div className="main-container">
      <div className="recipe-deets-header">
        <h3 data-testid="recipe-category">
          {recipe.strCategory}
        </h3>
        <div className="interactive-btns">
          <DetailsInteractiveBtns />
          <ShareButton dataTestidBtn="share-btn" url={ `http://localhost:3000/${formatedPath}` } />
        </div>
      </div>

      <div className="recipe-banner">
        <img
          src={ recipe.strMealThumb ?? recipe.strDrinkThumb ?? '' }
          alt="recipe"
          data-testid="recipe-photo"
        />
        <h1
          className="recipe-title"
          data-testid="recipe-title"
        >
          {recipe.strMeal || recipe.strDrink}
        </h1>
      </div>

      <div className="ingredients-container">
        <h3>Ingredients</h3>
        <ul className="ingredients-checklist">
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
      </div>

      {location.pathname.includes('meal') ? (
        <div className="preview-video">
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
      <div className="start-recipe-btn">
        <Button
          dataTestidBtn="finish-recipe-btn"
          disabled={ !Object.values(ingredientChecks).every((check) => check === true) }
          onClick={ handleClick }
        >
          Finish recipe
        </Button>
      </div>
    </div>
  );
}
