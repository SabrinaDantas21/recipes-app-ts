import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAllDrinksList, setPage } from '../redux/actions';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import { DispatchType } from '../util/types';

function Drinks() {
  const dispatch: DispatchType = useDispatch();

  useEffect(() => {
    dispatch(setPage({
      title: 'Drinks',
      showSearchIcon: true,
    }));
    dispatch(setAllDrinksList());
  }, []);

  return (
    <>
      <Header page="drinks" />
      <Recipes />
    </>
  );
}

export default Drinks;
