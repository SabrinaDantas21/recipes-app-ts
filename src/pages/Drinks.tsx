import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAllDrinksList, setPage } from '../redux/actions';
import Recipes from '../components/Recipes';
import { DispatchType } from '../util/types';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { getMealByFilter } from '../services/api';

function Drinks() {
  const dispatch: DispatchType = useDispatch()
  const navigate = useNavigate();
  const [mealsRecommendation, setMealsRecommendation] = useState([]);

  const getMealsRecommendation = async () => {
    const currentInfo = {
      searchBarInfo: {
        radioBtnValue: '',
        searchBarValue: '',
      },
      navigate,
    };
    const data = await getMealByFilter(currentInfo);
    setMealsRecommendation(data);
  };

  useEffect(() => {
    dispatch(setPage({
      title: 'Drinks',
      showSearchIcon: true,
    }));
    dispatch(setAllDrinksList());
    getMealsRecommendation();
  }, []);

  return (
    <>
      <Header page="drinks" />
      <Recipes />
    </>
  );
}

export default Drinks;
