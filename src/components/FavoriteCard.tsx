import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CardPropType, FavoriteRecipesType, GlobalStoreType } from '../util/types';
import ShareButton from './ShareButton';
import Button from './Button';
import isFavoriteBtn from '../images/blackHeartIcon.svg';
import DetailsInteractiveBtns from './DetailsInteractiveBtns';

function FavoriteCard(prop: CardPropType) {
  const navigate = useNavigate();
  const { index, img, title, category, id, type } = prop;
  // const [favoriteCard, setFavoriteCard] = useState(false);
  // const [isFavorite, setIsFavorite] = useState(false);
  // const { pathname } = useLocation();

  // const recipe = useSelector(
  //   (state: GlobalStoreType) => state.detailedRecipeReducer.recipe,
  // );

  // const recipeInProg = useSelector(
  //   (state: GlobalStoreType) => state.updateRecipeInProgressReducer.recipe,
  // );

  // const handleClick = (IdProp) => {
  //   const prevFavoriteList = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
  //   const usedRecipe = pathname.includes('in-progress')
  //     ? { ...recipeInProg }
  //     : { ...recipe };
  //   const idRecipe = usedRecipe.idMeal || usedRecipe.idDrink;

  //   const removedRecipe = prevFavoriteList
  //     .filter((item: FavoriteRecipesType) => item.id !== idRecipe);
  //   localStorage.setItem('favoriteRecipes', JSON.stringify(removedRecipe));

  //   setIsFavorite(false);
  // };

  return (
    <Card
      data-testid={ `${index}-recommendation-card` }
      style={ { width: '18rem' } }
    >
      <Card.Body>
        <Card.Link onClick={ () => { navigate(`/${type}s/${id}`); } }>
          <Card.Img
            data-testid={ `${index}-horizontal-image` }
            src={ img }
          />
          <Card.Title
            data-testid={ `${index}-horizontal-name` }
          >
            { title }
          </Card.Title>
        </Card.Link>
        <Card.Subtitle data-testid={ `${index}-horizontal-top-text` }>
          { category }
        </Card.Subtitle>
        <DetailsInteractiveBtns />
        <ShareButton
          dataTestidBtn={ `${index}-horizontal-share-btn` }
          url={ `http://localhost:3000/${type}s/${id}` }
        />
      </Card.Body>
    </Card>
  );
}

export default FavoriteCard;
