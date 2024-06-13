import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/actions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FilterButtons from '../components/FilterButtons';

function Meals() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage({
      title: 'Meals',
      showSearchIcon: true,
    }));
  });

  return (
    <>
      <Header page="meals" />
      <FilterButtons page="meals" />
      <Footer />
    </>
  );
}

export default Meals;
