import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/actions';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeLogout = () => {
    localStorage.setItem('user', 'count');
    localStorage.removeItem('user');
    localStorage.removeItem('count');
  };

  useEffect(() => {
    dispatch(setPage({
      title: 'Profile',
      showSearchIcon: false,
    }));
  }, [dispatch]);

  return (
    <>
      <Header />
      <h3 data-testid="profile-email">
        {localStorage.getItem('user')}
      </h3>
      <button type="button" data-testid="profile-done-btn">
        <Link to="/done-recipes">Done Recipes</Link>
      </button>
      <button type="button" data-testid="profile-favorite-btn">
        {' '}
        <Link to="/favorite-recipes">Favorite Recipes</Link>
      </button>
      <button
        type="reset"
        data-testid="profile-logout-btn"
        onChange={ handleChangeLogout }
      >
        <Link to="/">Logout</Link>
      </button>
      <Footer />
    </>
  );
}

export default Profile;
