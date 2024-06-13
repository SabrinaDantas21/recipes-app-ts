import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { setAllMealsList, setPage } from '../redux/actions';
import Recipes from '../components/Recipes';
import { DispatchType, DrinkRecommendationType } from '../util/types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FilterButtons from '../components/FilterButtons';
import { getDrinksByFilter } from '../services/api';
import RecommendationCard from '../components/RecommendationCard';

function Meals() {
  const dispatch: DispatchType = useDispatch();
  const navigate = useNavigate();
  const [
    drinksRecommendation,
    setDrinksRecommendation] = useState<DrinkRecommendationType[]>([]);

  const getDrinksRecommendation = async () => {
    const currentInfo = {
      searchBarInfo: {
        radioBtnValue: '',
        searchBarValue: '',
      },
      navigate,
    };
    const data = await getDrinksByFilter(currentInfo);
    setDrinksRecommendation(data.drinks);
  };

  useEffect(() => {
    dispatch(setPage({
      title: 'Meals',
      showSearchIcon: true,
    }));
    dispatch(setAllMealsList());
    getDrinksRecommendation();
  }, []);

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
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleBeforeChange = (nextSlide: number) => {
    setCurrentSlide(nextSlide);
  };
  return (
    <>
      <Header page="meals" />
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
          { drinksRecommendation.map((drink: DrinkRecommendationType, index) => {
            const isVisible = index >= currentSlide && index < currentSlide + 2;
            if (index < 6) {
              return (
                <div
                  key={ drink.idDrink }
                >
                  <RecommendationCard
                    isVisible={ isVisible }
                    key={ drink.idDrink }
                    index={ index }
                    img={ drink.strDrinkThumb }
                    title={ drink.strDrink }
                  />
                </div>
              );
            }
            return null;
          }) }
        </Carousel>
      </div>
      <Recipes />
      <Footer />
    </>
  );
}

export default Meals;
