import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import { DispatchType, GlobalStoreType } from '../../util/types';
import ConditionBtn from '../../components/ConditionBtn/ConditionBtn';
import {
  setAllDrinksList,
  setAllMealsList,
  setDetailedRecipe,
} from '../../redux/actions';
import DetailsInteractiveBtns from '../../components/DetailsInteractiveBtns';
import ShareButton from '../../components/ShareButton/ShareButton';
import RecomendationsCarousel from '../../components/Carousel/RecommendationsCarousel';
import './RecipeDetails.css';

export default function RecipeDetails() {
  const location = useLocation();
  const dispatch: DispatchType = useDispatch();

  const recipe = useSelector(
    (state: GlobalStoreType) => state.detailedRecipeReducer.recipe,
  );

  const { id } = useParams<{ id: string }>();

  const [isMeal, setIsMeal] = useState(false);

  const type = isMeal ? 'meals' : 'drinks';

  useEffect(() => {
    const getRecommendations = async () => {
      if (location.pathname.includes('meals')) {
        dispatch(setDetailedRecipe(id as string, 'meals'));
        dispatch(setAllDrinksList());
        setIsMeal(true);
      } else if (location.pathname.includes('drinks')) {
        dispatch(setDetailedRecipe(id as string, 'drinks'));
        dispatch(setAllMealsList());
      }
    };
    getRecommendations();
  }, []);

  return (
    <div className="main-container">
      <div className="recipe-deets-header">
        <h3 data-testid="recipe-category">
          {recipe.strCategory}
        </h3>
        <div className="interactive-btns">
          <DetailsInteractiveBtns />
          <ShareButton dataTestidBtn="share-btn" url={ `http://localhost:3000${location.pathname}` } />
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
      </div>

      {isMeal ? (
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

      <ConditionBtn type={ type } id={ id } />

      {location.pathname.includes('meals') ? (
        <RecomendationsCarousel page="Meals" />
      ) : (
        <RecomendationsCarousel page="Drinks" />
      )}
    </div>
  );
}
