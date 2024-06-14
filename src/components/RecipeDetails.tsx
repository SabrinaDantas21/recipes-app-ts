import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { DispatchType, GlobalStoreType } from '../util/types';
import { setAllDrinksList, setAllMealsList, setDetailedRecipe } from '../redux/actions';
import Button from './Button';
import './Button.css';
import RecommendationCard from './RecommendationCard';
import { getDrinksByFilter, getMealByFilter } from '../services/api';
import DetailsInteractiveBtns from './DetailsInteractiveBtns';


export default function RecipeDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch: DispatchType = useDispatch();

  const recipe = useSelector(
    (state: GlobalStoreType) => state.detailedRecipeReducer.recipe,
  );

  const { id } = useParams<{ id: string }>();

  const [isMeal, setIsMeal] = useState(false);
  const [recommendations, setRecommendations] = useState<object>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const currentInfo = {
    searchBarInfo: {
      radioBtnValue: '',
      searchBarValue: '',
    },
    navigate,
  };

  useEffect(() => {
    const getRecommendations = async () => {
      let data = [];
      if (location.pathname.includes('meals')) {
        dispatch(setDetailedRecipe(id as string, 'meals'));
        dispatch(setAllDrinksList());
        setIsMeal(true);
        data = await getDrinksByFilter(currentInfo);
      } else if (location.pathname.includes('drinks')) {
        dispatch(setDetailedRecipe(id as string, 'drinks'));
        dispatch(setAllMealsList());
        data = await getMealByFilter(currentInfo);
      }
      setRecommendations(data.drinks || data.meals);
    };
    getRecommendations();
  }, []);

  if (!recipe) {
    return <p>Carregando detalhes da receita...</p>;
  }

  const handleBeforeChange = (nextSlide: number) => {
    setCurrentSlide(nextSlide);
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 2,
    },
  };

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
      <Button
        className="fixed-btn"
        dataTestidBtn="start-recipe-btn"
      >
        Start Recipe
      </Button>
      <div style={ { width: '40%' } }>
        <Carousel
          swipeable={ false }
          draggable={ false }
          showDots={ false }
          responsive={ responsive }
          autoPlaySpeed={ 1000 }
          customTransition="all .5"
          transitionDuration={ 500 }
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          beforeChange={ handleBeforeChange }
        >
          { recommendations.map((recommendation, index) => {
            const key = recommendation.idDrink || recommendation.idMeal;
            const img = recommendation.strDrinkThumb || recommendation.strMealThumb;
            const title = recommendation.strMeal || recommendation.strDrink;
            const isVisible = index >= currentSlide && index < currentSlide + 2;
            if (index < 6) {
              return (
                <div
                  key={ key }
                >
                  <RecommendationCard
                    isVisible={ isVisible }
                    key={ key }
                    index={ index }
                    img={ img }
                    title={ title }
                  />
                </div>
              );
            }
            return null;
          }) }
        </Carousel>
      </div>
    </>
  );
}
