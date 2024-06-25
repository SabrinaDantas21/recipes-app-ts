import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';
import darkMealIcon from '../../images/darkMealIcon.svg';
import logoName from '../../images/logoName.svg';
import logoIcon from '../../images/logoIcon.svg';
import darkDrinkIcon from '../../images/darkDrinkIcon.svg';
import './Header.css';
import SearchBar from './SearchBar';
import { GlobalStoreType, SelectedPage } from '../../util/types';
import Button from '../Button/Button';

function Header({ page }: SelectedPage) {
  const { title,
    showSearchIcon } = useSelector((state: GlobalStoreType) => state.pageReducer);
  const navigate = useNavigate();
  const [toggleSearchBar, setToggleSearchBar] = useState(false);

  const handleClick = () => {
    navigate('/profile');
  };

  const handleSearchClick = () => {
    setToggleSearchBar((prevSate) => !prevSate);
  };

  const getImage = (titlePage: string) => {
    switch (titlePage) {
      case 'Profile':
        return profileIcon;
      case 'Drinks':
        return darkDrinkIcon;
      default:
        return darkMealIcon;
    }
  };

  const getImageAlt = (titlePage: string) => {
    switch (titlePage) {
      case 'Profile':
        return 'profile icon';
      case 'Drinks':
        return 'drink icon';
      default:
        return 'meal icon';
    }
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <img src={ logoIcon } alt="logo Icon" />
          <img src={ logoName } alt="app name" className="logo-name" />
        </div>
        <div>
          {showSearchIcon && (
            <div>
              <Button
                dataTestid="profile-top-btn"
                className="bottom-buttons"
                onClick={ handleClick }
                src={ profileIcon }
                alt="Profile Icon"
              />
              <Button
                dataTestid="search-top-btn"
                className="bottom-buttons "
                onClick={ handleSearchClick }
                src={ searchIcon }
                alt="Search Icon"
              />
            </div>
          )}
        </div>
      </header>
      <div className="div-title">
        <img src={ getImage(title) || darkMealIcon } alt={ getImageAlt(title) } />
        <h1 data-testid="page-title">{title}</h1>
        {toggleSearchBar && <SearchBar page={ page } />}
      </div>
    </>
  );
}

export default Header;
