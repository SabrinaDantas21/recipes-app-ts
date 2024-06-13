import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/actions';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage({
      title: 'Profile',
      showSearchIcon: false,
    }));
  });

  return (
    <>
      <Header />
      <Footer />
    </>
  );
}

export default Profile;
