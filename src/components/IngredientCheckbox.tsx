import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalStoreType, IngredientInputProps } from '../util/types';
import './IngredientCheckbox.css';
import { setIngredientChecks } from '../redux/actions';

export default function IngredientCheckbox(
  { recipe, ingredient, index }: IngredientInputProps,
) {
  const { ingredientChecks } = useSelector(
    (state: GlobalStoreType) => state.updateRecipeInProgressReducer,
  );
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();

  const handleChange = () => {
    const newIngredientChecksObject = {
      ...ingredientChecks,
      [ingredient]: !ingredientChecks[ingredient],
    };
    dispatch(setIngredientChecks(newIngredientChecksObject));
    setIsChecked(!isChecked);
  };

  return (
    <li>
      <label
        htmlFor={ `ingredient${index}` }
        data-testid={ `${index}-ingredient-step` }
        className={ isChecked ? 'checked-ingredient' : '' }
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
