import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConditionButtonType } from '../../util/types';
import Button from '../Button/Button';

function ConditionBtn({ type, id }:ConditionButtonType) {
  const [isRecipeDone, setIsRecipeDone] = useState(false);
  const [btnName, setBtnName] = useState('Start Recipe');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyLocalStorage = () => {
      const doneRecipesLs = localStorage.getItem('doneRecipes');
      const inProgressRecipesLs = localStorage.getItem('inProgressRecipes');
      const recipeStatus = JSON.parse(inProgressRecipesLs || '{}');
      const doneRecipes = JSON.parse(doneRecipesLs || '{}');
      const LsRecipes = Object.values(Object.values(doneRecipes));
      const LsRecipesDone = Object.values(Object.values(recipeStatus));
      const filterDoneRecipes = LsRecipes
        .find((item) => Object.values(item).includes(id));
      const filterInProgressRecipes = LsRecipesDone
        .find((item) => Object.values(item).includes(id));

      if (filterDoneRecipes) {
        setIsRecipeDone(true);
      }
      if (filterInProgressRecipes) {
        setBtnName('Continue Recipe');
      }
    };
    verifyLocalStorage();
  }, []);

  const addToInProgressRecipes = () => {
    const inProgressRecipesLs = localStorage.getItem('inProgressRecipes');
    const inProgressRecipes = inProgressRecipesLs
      ? JSON.parse(inProgressRecipesLs) : { meals: {}, drinks: {} };

    const updatedInProgressRecipes = {
      ...inProgressRecipes,
      [type]: {
        ...inProgressRecipes[type],
        [id as string]: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(updatedInProgressRecipes));
  };

  const handleClick = () => {
    addToInProgressRecipes();
    if (type === 'meals') {
      navigate(`/meals/${id}/in-progress`);
    } else {
      navigate(`/drinks/${id}/in-progress`);
    }
  };

  return (
    <div data-testid="start-recipe-btn-container">
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
