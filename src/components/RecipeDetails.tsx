import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { DispatchType } from '../util/types';
import { setDetailedRecipe } from '../redux/actions';

export default function RecipeDetails() {
  const location = useLocation();
  const dispatch: DispatchType = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    if (location.pathname.includes('meals')) {
      dispatch(setDetailedRecipe(id as string, 'meals'));
    } if (location.pathname.includes('drinks')) {
      dispatch(setDetailedRecipe(id as string, 'drinks'));
    }
  }, []);

  return (
    <>
      {/* Pode remover esse h3 e h6 */}
      <h6>{location.pathname}</h6>
      <h3>Detalhes da receita serão renderizado aqui</h3>
    </>
  );
}
