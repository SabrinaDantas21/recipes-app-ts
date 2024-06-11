import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/actions';
import Header from '../components/Header';

function Meals() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage({
      title: 'Meals',
      showSearchIcon: true,
    }));
  });

  return (
    <Header />
  );
}

export default Meals;
