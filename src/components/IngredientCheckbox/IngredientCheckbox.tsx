import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { GlobalStoreType, IngredientInputProps } from '../../util/types';
import './IngredientCheckbox.css';
import { setIngredientChecks } from '../../redux/actions';

export default function IngredientCheckbox(
  { recipe, ingredient, index }: IngredientInputProps,
) {
  const { ingredientChecks } = useSelector(
    (state: GlobalStoreType) => state.updateRecipeInProgressReducer,
  );
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const dispatch = useDispatch();

  const type = location.pathname.includes('meals') ? 'meals' : 'drinks';

  const handleChange = () => {
    const newIngredientChecksObject = {
      ...ingredientChecks,
      [ingredient]: !ingredientChecks[ingredient],
    };
    dispatch(setIngredientChecks(newIngredientChecksObject));

    const inProgressRecipesLs = localStorage.getItem('inProgressRecipes');
    const inProgressRecipes = inProgressRecipesLs
      ? JSON.parse(inProgressRecipesLs) : { meals: {}, drinks: {} };

    const arr: number[] = [];

    Object.values(newIngredientChecksObject)
      .forEach((value, i) => { if (value === true) arr.push(i); });

    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...inProgressRecipes,
      [type]: {
        ...inProgressRecipes[type],
        [id as string]: arr,
      },
    }));
  };

  return (
    <li>
      <label
        htmlFor={ `ingredient${index}` }
        data-testid={ `${index}-ingredient-step` }
        className={ ingredientChecks[ingredient] ? 'checked-ingredient' : '' }
      >
        <input
          id={ `ingredient${index}` }
          type="checkbox"
          checked={ ingredientChecks[ingredient] }
          onChange={ handleChange }
        />
        {recipe[ingredient]}
        {' '}
        -
        {recipe[`strMeasure${ingredient.match(/\d+/)}`]}

      </label>
    </li>
  );
}
