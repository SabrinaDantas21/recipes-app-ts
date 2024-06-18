import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/actions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeLogout = () => {
    localStorage.clear()
    navigate('/');
  };

  useEffect(() => {
    dispatch(setPage({
      title: 'Profile',
      showSearchIcon: false,
    }));
  }, [dispatch]);

  const user = localStorage.getItem('user')
  const userObject = JSON.parse(user as string);
  return (
    <>
      <Header />
      <h3 data-testid="profile-email">
        {userObject.email}
      </h3>
      <Button type="button" data-testid="profile-done-btn"  onClick = {()=>{navigate("/done-recipes")}}>
        Done Recipes
      </Button>
      <Button type="button" data-testid="profile-favorite-btn" onClick = {()=>{navigate("/favorite-recipes")}}>
        Favorite Recipes
      </Button>
      <Button
        type="reset"
        data-testid="profile-logout-btn"
        onClick={ handleChangeLogout }
      >Logout</Button>
      <Footer />
    </>
  );
}

export default Profile;
