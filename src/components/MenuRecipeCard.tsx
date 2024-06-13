import { MenuRecipeCardPropsType } from '../util/types';

export default function MenuRecipeCard(
  { image, recipeName, index }: MenuRecipeCardPropsType,
) {
  const cardTestId = `${index}-recipe-card`;
  const imageTestId = `${index}-card-img`;
  const recipeNameTestId = `${index}-card-name`;
  return (
    <div data-testid={ cardTestId }>
      <img data-testid={ imageTestId } src={ image } alt={ recipeName } />
      <h3 data-testid={ recipeNameTestId }>{ recipeName }</h3>
    </div>
  );
}
