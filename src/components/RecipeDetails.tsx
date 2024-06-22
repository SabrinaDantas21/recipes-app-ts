import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import { DispatchType, GlobalStoreType } from '../util/types';
import ConditionBtn from './ConditionBtn';
import { setAllDrinksList, setAllMealsList, setDetailedRecipe } from '../redux/actions';
import './Button.css';
import DetailsInteractiveBtns from './DetailsInteractiveBtns';
import ShareButton from './ShareButton';
import RecomendationsCarousel from './Carousel/RecommendationsCarousel';

export default function RecipeDetails() {
  const location = useLocation();
  const navigate = useNavigate();
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
    <>
      <img
        src={ recipe.strMealThumb ?? recipe.strDrinkThumb ?? '' }
        alt="recipe"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h1>

      <DetailsInteractiveBtns />
      <ShareButton dataTestidBtn="share-btn" url={ `http://localhost:3000${location.pathname}` } />

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

      {location.pathname.includes('meals') ? (
        <RecomendationsCarousel page="Meals" />
      ) : (
        <RecomendationsCarousel page="Drinks" />
      )}
    </>
  );
}
