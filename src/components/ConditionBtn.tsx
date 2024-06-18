import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ConditionButtonType, GlobalStoreType } from '../util/types';
import Button from './Button';

function ConditionBtn({ type, id }:ConditionButtonType) {
  const location = useLocation();
  const [isRecipeDone, setIsRecipeDone] = useState(false);
  const [btnName, setBtnName] = useState('Start Recipe');
  const navigate = useNavigate();
  const recipe = useSelector(
    (state: GlobalStoreType) => state.detailedRecipeReducer.recipe,
  );

  useEffect(() => {
    const verifyLocalStorage = () => {
      const doneRecipesLs = localStorage.getItem('doneRecipes');
      const inProgressRecipesLs = localStorage.getItem('inProgressRecipes');
      const recipeStatus = JSON.parse(inProgressRecipesLs || '{}');
      const doneRecipes = JSON.parse(doneRecipesLs || '{}');
      const LsRecipes = Object.values(Object.values(doneRecipes));
      const LsRecipesDone = Object.values(Object.values(recipeStatus));
      const filterDoneRecipes = LsRecipes
        .find((item) => Object.keys(item).includes(id));
      const filterInProgressRecipes = LsRecipesDone
        .find((item) => Object.keys(item).includes(id));

      if (filterDoneRecipes) {
        setIsRecipeDone(true);
      }

      if (filterInProgressRecipes) {
        setBtnName('Continue Recipe');
      }
      if (filterInProgressRecipes && location.pathname.includes('/in-progress')) {
        setBtnName('Finish Recipe');
      }
    };
    verifyLocalStorage();
  }, [id, type, location.pathname]);

  const addToInProgressRecipes = () => {
    const inProgressRecipesLs = localStorage.getItem('inProgressRecipes');
    const inProgressRecipes = inProgressRecipesLs
      ? JSON.parse(inProgressRecipesLs) : { meals: {}, drinks: {} };

    const updatedInProgressRecipes = {
      ...inProgressRecipes,
      [type]: {
        ...inProgressRecipes[type],
        [id as string]: Object.keys(recipe).filter((key) => key
          .includes('strIngredient') && recipe[key]),
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(updatedInProgressRecipes));
  };

  const addToDoneRecipes = () => {
    const doneRecipesLs = localStorage.getItem('doneRecipes') || '[]';
    const doneRecipesObject = JSON.parse(doneRecipesLs);
    const newRecipeObject = {
      id: recipe.idMeal || recipe.idDrink,
      type: location.pathname.includes('/meals') ? 'meal' : 'drink',
      nationality: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
      doneDate: new Date().toLocaleDateString(),
      tags: recipe.strTags?.split(',') || [],
    };
    localStorage
      .setItem('doneRecipes', JSON.stringify([...doneRecipesObject, newRecipeObject]));
  };

  const handleClick = () => {
    if (location.pathname.includes('/in-progress')) {
      return addToDoneRecipes();
    }
    addToInProgressRecipes();
    if (type === 'meals') {
      navigate(`/meals/${id}/in-progress`);
    } else {
      navigate(`/drinks/${id}/in-progress`);
    }
  };

  return (
    <div>
      {!isRecipeDone && (
        <Button
          className="fixed-btn"
          dataTestidBtn="start-recipe-btn"
          onClick={ handleClick }
        >
          {btnName}
        </Button>
      )}
    </div>
  );
}

export default ConditionBtn;
