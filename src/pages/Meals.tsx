import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAllMealsList, setPage } from '../redux/actions';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import { DispatchType } from '../util/types';

function Meals() {
  const dispatch: DispatchType = useDispatch();

  useEffect(() => {
    dispatch(setPage({
      title: 'Meals',
      showSearchIcon: true,
    }));
    dispatch(setAllMealsList());
  }, []);

  return (
    <>
      <Header page="meals" />
      <Recipes />
    </>
  );
}

export default Meals;
