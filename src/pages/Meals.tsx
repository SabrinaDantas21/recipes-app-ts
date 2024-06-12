import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPage } from '../redux/actions';
import Header from '../components/Header';
import { getDrinksByFilter } from '../services/api';

function Meals() {
  const dispatch = useDispatch();
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
    getDrinksRecommendation();
  }, []);

  return (
    <Header page="meals" />
  );
}

export default Meals;
