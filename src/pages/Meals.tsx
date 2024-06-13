import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/actions';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
      <Footer />
    </>
  );
}

export default Meals;
