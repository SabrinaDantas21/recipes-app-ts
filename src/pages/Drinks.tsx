import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPage } from '../redux/actions';
import Header from '../components/Header';
import { getMealByFilter } from '../services/api';

function Drinks() {
  const dispatch = useDispatch();
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
    getMealsRecommendation();
  }, []);

  return (
    <Header page="drinks" />
  );
}

export default Drinks;
