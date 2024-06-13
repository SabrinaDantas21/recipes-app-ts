import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import { GlobalStoreType, SelectedPage } from '../util/types';
import Button from './Button';

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

  return (
    <header>
      <h1 data-testid="page-title">{title}</h1>
      <div>
        {showSearchIcon && (
          <>
            <Button
              dataTestid="search-top-btn"
              onClick={ handleSearchClick }
              src={ searchIcon }
              alt="Search Icon"
            />
            {toggleSearchBar && <SearchBar page={ page } />}
          </>
        )}
        <Button
          dataTestid="profile-top-btn"
          onClick={ handleClick }
          src={ profileIcon }
          alt="Profile Icon"
        />
      </div>
    </header>
  );
}

export default Header;
