import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Carousel.css';
import { getMainRecipesList } from '../../services/api';

type CarouselType = {
  page: 'Meals' | 'Drinks'
};

export type MealType = {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strCategory: string
  strInstructions: string
  strYoutube: string
};

export type DrinkType = {
  idDrink: string
  strDrink: string
  strDrinkThumb: string
  strCategory: string
  strInstructions: string
  strAlcoholic: string
};

export type MainAPIReturnTypeCarousel = {
  meals?: MealType[]
  drinks?: DrinkType[]
};

function RecomendationsCarousel({ page }: CarouselType) {
  const [recomendations, setRecomendations] = useState<MainAPIReturnTypeCarousel>({});
  const [images, setImages] = useState<string[] | undefined>([]);
  const [titles, setTitles] = useState<string[] | undefined>([]);

  const saveRecomendations = async () => {
    if (page === 'Meals') {
      const data = await getMainRecipesList('Drinks');
      setRecomendations(data);
    }

    if (page === 'Drinks') {
      const data = await getMainRecipesList('Meals');
      setRecomendations(data);
    }
  };

  const treatRecomendations = () => {
    if (page === 'Meals') {
      const imgsList = recomendations.drinks?.slice(0, 6)
        .map((drink) => drink.strDrinkThumb);
      setImages(imgsList);
      const titlesList = recomendations.drinks?.slice(0, 6)
        .map((drink) => drink.strDrink);
      setTitles(titlesList);
    } else {
      const imgsList = recomendations.meals?.slice(0, 6)
        .map((meal) => meal.strMealThumb);
      setImages(imgsList);
      const titlesList = recomendations.meals?.slice(0, 6)
        .map((meal) => meal.strMeal);
      setTitles(titlesList);
    }
  };

  useEffect(() => {
    saveRecomendations();
  }, []);

  useEffect(() => {
    treatRecomendations();
  }, [recomendations]);

  return (
    <Carousel>
      <Carousel.Item>
        <div className="carousel-img-controll">
          <div data-testid="0-recommendation-card">
            <img src={ images?.[0] } alt="1-recommendation" />
            <p data-testid="0-recommendation-title">{titles?.[0]}</p>
          </div>
          <div data-testid="1-recommendation-card">
            <img src={ images?.[1] } alt="2-recommendation" />
            <p data-testid="1-recommendation-title">{titles?.[1]}</p>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-img-controll">
          <div data-testid="2-recommendation-card">
            <img src={ images?.[2] } alt="3-recommendation" />
            <p data-testid="2-recommendation-title">{titles?.[2]}</p>
          </div>
          <div data-testid="3-recommendation-card">
            <img src={ images?.[3] } alt="4-recommendation" />
            <p data-testid="3-recommendation-title">{titles?.[3]}</p>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-img-controll">
          <div data-testid="4-recommendation-card">
            <img src={ images?.[4] } alt="5-recommendation" />
            <p data-testid="4-recommendation-title">{titles?.[4]}</p>
          </div>
          <div data-testid="5-recommendation-card">
            <img src={ images?.[5] } alt="6-recommendation" />
            <p data-testid="5-recommendation-title">{titles?.[5]}</p>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default RecomendationsCarousel;
