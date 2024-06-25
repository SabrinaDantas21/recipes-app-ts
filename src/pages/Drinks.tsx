import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAllDrinksList, setPage } from '../redux/actions';
import Recipes from '../components/Recipes';
import { DispatchType } from '../util/types';
import Header from '../components/Header/Header';
import Footer from '../components/Footer';

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
      <header>
        <Header page="drinks" />
      </header>
      <Recipes />
      <Footer />
    </>
  );
}

export default Drinks;
