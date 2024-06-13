import { useNavigate } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import styles from './Footer.module.css';

function Footer() {
  const navigate = useNavigate();

  const handleCLick = (path: string) => {
    navigate(path);
  };

  return (
    <footer
      data-testid="footer"
      className={ styles.footer }
    >
      <button
        onClick={ () => handleCLick('/drinks') }
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drinkIcon"
        />
      </button>

      <button
        onClick={ () => handleCLick('/meals') }
      >
        <img
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          alt="mealIcon"
        />
      </button>
    </footer>
  );
}

export default Footer;
