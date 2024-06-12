import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/actions';
import Header from '../components/Header';

function Profile() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage({
      title: 'Profile',
      showSearchIcon: false,
    }));
  });

  return (
    <Header />
  );
}

export default Profile;
