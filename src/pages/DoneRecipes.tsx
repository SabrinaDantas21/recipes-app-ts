import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/actions';
import Header from '../components/Header';

function DoneRecipes() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage({
      title: 'Done Recipes',
      showSearchIcon: false,
    }));
  });

  return (
    <Header />
  );
}

export default DoneRecipes;
