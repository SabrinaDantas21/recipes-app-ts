import { useSelector } from 'react-redux';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

function Header() {
  const { title, showSearchIcon } = useSelector((state) => state.pageReducer);
  return (
    <header>
      <h1 data-testid="page-title">{title}</h1>
      <div>
        {showSearchIcon && (
          <button
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="Search Icon"
          />
        )}
        <button
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Profile Icon"
        />
      </div>
    </header>
  );
}

export default Header;
