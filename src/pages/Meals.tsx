import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import 'react-multi-carousel/lib/styles.css';
import { setAllMealsList, setPage } from '../redux/actions';
import Recipes from '../components/Recipes';
import { DispatchType } from '../util/types';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
      <header>
        <Header page="meals" />
      </header>
      <Recipes />
      <Footer />
    </>
  );
}

export default Meals;
