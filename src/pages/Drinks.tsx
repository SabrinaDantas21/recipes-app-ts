import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { setAllDrinksList, setPage } from '../redux/actions';
import Recipes from '../components/Recipes';
import { DispatchType, MealRecommendationType } from '../util/types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FilterButtons from '../components/FilterButtons';
import { getMealByFilter } from '../services/api';
import RecommendationCard from '../components/RecommendationCard';

function Drinks() {
  const dispatch: DispatchType = useDispatch();
  const navigate = useNavigate();
  const [
    mealsRecommendation,
    setMealsRecommendation,
  ] = useState<MealRecommendationType[]>([]);

  const getMealsRecommendation = async () => {
    const currentInfo = {
      searchBarInfo: {
        radioBtnValue: '',
        searchBarValue: '',
      },
      navigate,
    };
    const data = await getMealByFilter(currentInfo);
    setMealsRecommendation(data.meals);
  };

  console.log(mealsRecommendation);

  useEffect(() => {
    dispatch(setPage({
      title: 'Drinks',
      showSearchIcon: true,
    }));
    dispatch(setAllDrinksList());
    getMealsRecommendation();
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleBeforeChange = (nextSlide: number) => {
    setCurrentSlide(nextSlide);
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
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
      <header>
        <Header page="drinks" />
      </header>
      <Recipes />
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
          { mealsRecommendation.map((meal:MealRecommendationType, index) => {
            const isVisible = index >= currentSlide && index < currentSlide + 2;
            if (index < 6) {
              return (
                <div
                  key={ meal.idMeal }
                >
                  <RecommendationCard
                    isVisible={ isVisible }
                    key={ meal.idMeal }
                    index={ index }
                    img={ meal.strMealThumb }
                    title={ meal.strMeal }
                  />
                </div>
              );
            }
            return null;
          }) }
        </Carousel>
      </div>
      <Footer />
    </>
  );
}

export default Drinks;
