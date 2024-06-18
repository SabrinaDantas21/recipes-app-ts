import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ConditionButtonType, GlobalStoreType } from '../util/types';
import Button from './Button';

function ConditionBtn({ type, id }:ConditionButtonType) {
  const location = useLocation();
  const [isRecipeDone, setIsRecipeDone] = useState(false);
  const [btnName, setBtnName] = useState('Start Recipe');
  const [btnTestId, setBtnTestId] = useState('start-recipe-btn');
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const { ingredientChecks } = useSelector(
    (state: GlobalStoreType) => state.updateRecipeInProgressReducer,
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

      if (location.pathname.includes('in-progress')) {
        setBtnTestId('finish-recipe-btn');
        setIsDisabled(!Object.values(ingredientChecks).every((check) => check === true));
        setBtnName('Finish Recipe');
      }

      if (filterInProgressRecipes) {
        setBtnName('Continue Recipe');
      }
    };
    verifyLocalStorage();
  }, [id, type, location.pathname, ingredientChecks]);

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

  const addToDoneRecipes = () => {
    const doneRecipesLs = localStorage.getItem('doneRecipes');
    const doneRecipes = doneRecipesLs
      ? JSON.parse(doneRecipesLs) : { meals: {}, drinks: {} };

    const updatedDoneRecipes = {
      ...doneRecipes,
      [type]: {
        ...doneRecipes[type],
        [id as string]: [],
      },
    };

    localStorage.setItem('doneRecipes', JSON.stringify(updatedDoneRecipes));
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
          dataTestidBtn={ btnTestId }
          onClick={ handleClick }
          disabled={ isDisabled }
        >
          {btnName}
        </Button>
      )}
    </div>
  );
}

export default ConditionBtn;
