import { useLocation, useNavigate } from 'react-router-dom';
import { MenuRecipeCardPropsType } from '../util/types';
import './MenuRecipesCard.css';

export default function MenuRecipeCard(
  { id, image, recipeName, index }: MenuRecipeCardPropsType,
) {
  const navigate = useNavigate();
  const location = useLocation();

  const cardTestId = `${index}-recipe-card`;
  const imageTestId = `${index}-card-img`;
  const recipeNameTestId = `${index}-card-name`;

  const handleClick = () => {
    navigate(`${location.pathname}/${id}`);
  };

  return (
    <button className="menu-card" onClick={ handleClick } data-testid={ cardTestId }>
      <img data-testid={ imageTestId } src={ image } alt={ recipeName } />
      <h3 data-testid={ recipeNameTestId }>{ recipeName }</h3>
    </button>
  );
}
