import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAllMealsList, setPage } from '../redux/actions';
import Recipes from '../components/Recipes';
import { DispatchType } from '../util/types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FilterButtons from '../components/FilterButtons';
import { getDrinksByFilter } from '../services/api';

function Meals() {
  const dispatch: DispatchType = useDispatch();
  const navigate = useNavigate();
  const [drinksRecommendation, setDrinksRecommendation] = useState([]);

  const getDrinksRecommendation = async () => {
    const currentInfo = {
      searchBarInfo: {
        radioBtnValue: '',
        searchBarValue: '',
      },
      navigate,
    };
    const data = await getDrinksByFilter(currentInfo);
    setDrinksRecommendation(data);
  };

  useEffect(() => {
    dispatch(setPage({
      title: 'Meals',
      showSearchIcon: true,
    }));
    dispatch(setAllMealsList());
    getDrinksRecommendation();
  }, []);

  return (
    <>
      <Header page="meals" />
      <Recipes />
      <Footer />
    </>
  );
}

export default Meals;
