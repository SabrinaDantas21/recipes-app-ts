import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/actions';
import Header from '../components/Header';

function Drinks() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage({
      title: 'Drinks',
      showSearchIcon: true,
    }));
  });

  return (
    <Header page="drinks" />
  );
}

export default Drinks;
