import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPage } from '../../redux/actions';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button/Button';
import './Profile.css';

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    dispatch(setPage({
      title: 'Profile',
      showSearchIcon: false,
    }));
  }, []);

  const user = localStorage.getItem('user');
  const userObject = JSON.parse(user as string);

  return (
    <div className="page-back-ground-profile">
      {' '}
      <Header />
      {userObject?.email ? (
        <h3 className="email-profile" data-testid="profile-email">
          {' '}
          {userObject.email}
        </h3>
      ) : null}
      <Button
        type="button"
        className="button-page-login"
        dataTestidBtn="profile-done-btn"
        onClick={ () => navigate('/done-recipes') }
      >
        Done Recipes
      </Button>
      <Button
        type="button"
        className="button-page-login"
        dataTestidBtn="profile-favorite-btn"
        onClick={ () => navigate('/favorite-recipes') }
      >
        Favorite Recipes
      </Button>
      <Button
        type="reset"
        className="button-page-login"
        dataTestidBtn="profile-logout-btn"
        onClick={ handleChangeLogout }
      >
        Logout
      </Button>
      <Footer />
    </div>
  );
}

export default Profile;
