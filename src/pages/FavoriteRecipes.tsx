import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/actions';
import Header from '../components/Header';

function FavoriteRecipes() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage({
      title: 'Favorite Recipes',
      showSearchIcon: false,
    }));
  });

  return (
    <Header />
  );
}

export default FavoriteRecipes;
