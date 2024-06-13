import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/actions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FilterButtons from '../components/FilterButtons';

function Drinks() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage({
      title: 'Drinks',
      showSearchIcon: true,
    }));
  });

  return (
    <>
      <Header page="drinks" />
      <FilterButtons page="drinks" />
      <Footer />
    </>
  );
}

export default Drinks;
