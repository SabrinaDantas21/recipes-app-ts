import { useNavigate } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import styles from './Footer.module.css';
import Button from '../Button';

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
      <Button
        dataTestid="drinks-bottom-btn"
        onClick={ () => handleCLick('/drinks') }
        src={ drinkIcon }
        alt="drinkIcon"
      />

      <Button
        dataTestid="meals-bottom-btn"
        onClick={ () => handleCLick('/meals') }
        src={ mealIcon }
        alt="mealIcon"
      />
    </footer>
  );
}

export default Footer;
