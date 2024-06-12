import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import { SelectedPage } from '../util/types';

function Header({ page }: SelectedPage) {
  const { title, showSearchIcon } = useSelector((state) => state.pageReducer);
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
            <button
              data-testid="search-top-btn"
              src={ searchIcon }
              onClick={ handleSearchClick }
            >
              <img src={ searchIcon } alt="Search Icon" />
            </button>
            {toggleSearchBar && <SearchBar page={ page } />}
          </>
        )}
        <button
          data-testid="profile-top-btn"
          src={ profileIcon }
          onClick={ handleClick }
        >
          <img src={ profileIcon } alt="Profile Icon" />
        </button>
      </div>
    </header>
  );
}

export default Header;
