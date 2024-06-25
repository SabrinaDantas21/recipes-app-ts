import { useNavigate } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import Button from '../Button/Button';
import './Footer.css';

function Footer() {
  const navigate = useNavigate();

  const handleCLick = (path: string) => {
    navigate(path);
  };

  return (
    <footer
      data-testid="footer"
    >
      <div className="footer-container">
        <Button
          dataTestid="drinks-bottom-btn"
          className="bottom-buttons"
          onClick={ () => handleCLick('/drinks') }
          src={ drinkIcon }
          alt="drinkIcon"
        />

        <Button
          dataTestid="meals-bottom-btn"
          className="bottom-buttons"
          onClick={ () => handleCLick('/meals') }
          src={ mealIcon }
          alt="mealIcon"
        />
      </div>
    </footer>
  );
}

export default Footer;
