import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

function Header() {
  const { title, showSearchIcon } = useSelector((state) => state.pageReducer);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/profile');
  };

  return (
    <header>
      <h1 data-testid="page-title">{title}</h1>
      <div>
        {showSearchIcon && (
          <button
            data-testid="search-top-btn"
            src={ searchIcon }
          >
            <img src={ searchIcon } alt="Search Icon" />
          </button>
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
